<!-- DAPP -->

- https://github.com/aragon/use-wallet/pull/122
- https://guoyu.mirror.xyz/RD-xkpoxasAU7x5MIJmiCX4gll3Cs0pAd5iM258S1Ek
- [chain-temp](https://github.com/xiaotiandada/chain-temp)
- [create-eth-app](https://github.com/paulrberg/create-eth-app)
- [useDapp](https://github.com/TrueFiEng/useDApp)
- [useWallet](https://github.com/aragon/use-wallet)
- https://github.com/xiaotiandada/blog/issues/46

### useDapp 连接其他网络正常读取合约数据

- https://github.com/TrueFiEng/useDApp/issues/725

```ts
useCalls(calls, { chainId: Goerli.chainId }) 
```

### 获取帐号 NFT

- https://docs.alchemy.com/reference/getnfts

**pageSize** integer

String - 每页要返回的 NFT 数量。默认为 100。最大值为 100。 

> 一定要做好分页处理

**pageKey** string

如果有更多结果可用，则会在响应中返回一个 pageKey。将 pageKey 作为参数传回以获取下一页结果。

```ts
import { Alchemy, GetNftsForOwnerOptions, OwnedNftsResponse } from 'alchemy-sdk'

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

/**
 * Init Alchemy
 * @returns
 */
const initAlchemy = (): Alchemy => {
  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: ALCHEMY_NETWORK,
  }

  return new Alchemy(settings)
}

/**
 * Get All NFT
 * @param owner
 * @returns
 */
const getAllNfts = async (owner: string): Promise<OwnedNftsResponse> => {
  const alchemy = initAlchemy()
  const nfts: Writeable<OwnedNftsResponse> = {
    ownedNfts: [],
    pageKey: undefined,
    totalCount: 0,
  }

  const getNft = async (owner: string, options?: GetNftsForOwnerOptions) => {
    const result = await alchemy.nft.getNftsForOwner(owner, {
      // pageSize: 100,
      ...options,
    })

    nfts.ownedNfts.push(...result.ownedNfts)
    nfts.pageKey = result.pageKey
    nfts.totalCount = result.totalCount

    if (result?.pageKey) {
      await getNft(owner, {
        pageKey: result.pageKey,
      })
    }
  }

  await getNft(owner)

  return nfts
}
```

### 前端

#### 调用合约

1. 写 Hooks 方法

```tsx
import { useCallback, useMemo } from 'react';
import { BigNumber, ethers, utils } from 'ethers';

import { currentProvider } from 'https://data-seed-prebsc-2-s2.binance.org:8545 BSC Provider';
import { useSigner } from '看下面的 useSigner Hooks';
import { TokenFactory__factory } from '合约 Compile 出来的 Typechain 文件'

export function useTokenFactory() {
  const { signer, isSignerReady } = useSigner();
  console.log('currentContracts', currentContracts)

  const token = useMemo(() => {
    const readonlyProvider = currentProvider as ethers.providers.Provider;
    if (isSignerReady(signer)) {
      return TokenFactory__factory.connect(合约地址, signer)
    } else {
      return TokenFactory__factory.connect(合约地址, readonlyProvider)
    }
  }, [ signer, isSignerReady ])

  /**
   * 发布 Token
   */
  const mint = useCallback(
    async (
      name: string,
      symbol: string,
      initialBalance: string
    ): Promise<ethers.ContractTransaction> => {
    const mintToken = await token.mint(name, symbol, BigNumber.from(utils.parseUnits(initialBalance, 18)))
    console.log('mintToken', mintToken)
    console.log('mintToken hash', mintToken.hash)
    mintToken.wait()
    return mintToken
  }, [ token ])

  /**
   * 发布过的 Token
   */
  const list = useCallback(
    async (): Promise<string[]>  => {
      const listResult = await token.list()
      console.log('listResult', listResult)
      return listResult
  }, [ token ])

  return {
    mint, list
  }
}
```

2. 页面调用

```tsx
  const { mint, list } = useTokenFactory()
  
  // list
  async () => {
    await list()
  }
  
  // mint
  await mint(name, symbol, initialBalance)
```



#### 批量查询

```tsx
// Multicall 具体可以看 Repo 里面的方法

import { ethers } from 'ethers';
import { Multicall__factory } from 'Multicall Contract';
import { currentMulticallAddress } from 'Multicall Address';
import { currentProvider } from '参考上面的 providers';

// static multicall
export const staticMulticall = Multicall__factory.connect(
  currentMulticallAddress,
  currentProvider as ethers.providers.Provider
);
```

```tsx
import { BigNumber, ethers, utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';

import { _abi } from '合约导出的 ABI'
import { staticMulticall } from './useMulticall';
import { chunk } from 'lodash';

interface ERC20MulticallResult {
  address: string,
  data: {
    [key: string]: string | number | ethers.BigNumber,
    name: string,
    symbol: string,
    decimals: number,
    totalSupply: ethers.BigNumber,
    balanceOf: ethers.BigNumber
  }
}

const ERC20Interface = new utils.Interface(_abi)
// console.log('ERC20Interface', ERC20Interface)

/**
 * ERC20 Multicall
 * @param address
 * @returns
 */
export function useERC20Multicall(address: string[]) {
  const { account } = useWallet();
  const [tokenData, setTokenData] = useState<ERC20MulticallResult[]>([])

  // fetch data
  const fetchAllAddress = useCallback(
    async () => {
      if (!address.length) {
        return
      }

      // 校验地址
      const checksAddress = address.map(i => utils.getAddress(i))

      if (!checksAddress.length) {
        return
      }

      let keys = [ 'name', 'symbol', 'decimals', 'totalSupply', 'balanceOf' ]
      const len = account ? 5 : 4

      // calls
      const calls :{ target: string,callData: string  }[] = []
      for (let i = 0; i < checksAddress.length; i++) {
        const ele = checksAddress[i];
        for (let j = 0; j < len; j++) {
          calls.push({
            target: ele,
            callData: ERC20Interface.encodeFunctionData(keys[j], (keys[j] === 'balanceOf' && account) ? [account] : [])
          })
        }
      }

      // aggregate
      const { returnData } = await staticMulticall.callStatic.aggregate(calls)

      // merged
      const chunkReturnData = chunk(returnData, len)
      console.log('chunkReturnData', chunkReturnData)

      let result: ERC20MulticallResult[] = []
      for (let i = 0; i < chunkReturnData.length; i++) {
        const ele = chunkReturnData[i];
        result[i] = {
          address: checksAddress[i],
          data: {
            name: '',
            symbol: '',
            decimals: 18,
            totalSupply: BigNumber.from(0),
            balanceOf: BigNumber.from(0),
          }
        }
        for (let j = 0; j < ele.length; j++) {
          const eleJ = ele[j];
          const [ res ] = ERC20Interface.decodeFunctionResult(keys[j], eleJ)
          result[i].data[keys[j]] = res
        }
      }

      console.log('result', result)
      setTokenData(result)

      return result
  }, [ address, account ])

  useEffect(() => {
    console.log('address', address)
    fetchAllAddress()
  }, [ address, fetchAllAddress ])

  return { tokenData };
}
```

聚合查询：讲解（同样也很感谢好同事写的方法）

```ts
// calls 格式, 可以根据自己的需求封装方法
const calls = [
  {
    target: address,
    callData: ERC20Interface.encodeFunctionData('key', [])
  }
]

// aggregate 聚合去查询
const { returnData } = await staticMulticall.callStatic.aggregate(calls)

// 解码数据
const [ res ] = ERC20Interface.decodeFunctionResult('key', returnData[index])
```



#### 批量查询余额

和上面的聚合查询差不多的，批量处理 Calls 方法然后调用。(查询余额 记得带 Account)

```ts
Interface.encodeFunctionData('balanceOf', [account])
```



#### 签名

```tsx
// 感谢俺的同事写的 Hooks 复制过来的

import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useWallet } from 'use-wallet';

/**
 * 签名
 * @param addressOrIndex
 * @returns
 */
export function useSigner(addressOrIndex?: string | number) {
  const wallet = useWallet();

  const signer = useMemo(() => {
    if (!wallet.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(wallet.ethereum as ReturnType<typeof wallet.ethereum>);
    return provider.getSigner(addressOrIndex);
  }, [wallet, addressOrIndex]);

  function isSignerReady(
    signer: ethers.providers.JsonRpcSigner | null
  ): signer is ethers.providers.JsonRpcSigner {
    return Boolean(signer);
  }

  return { signer, isSignerReady };
}
```



#### Token 选择

<img src="https://user-images.githubusercontent.com/24250627/130107940-5e502cfb-592b-4f86-83f1-47dd16f149c3.png" alt="image" style="width: 300px" />



- Hooks https://github.com/xiaotiandada/chain-temp/blob/master/src/hooks/useTokenList.ts

- Views https://github.com/xiaotiandada/chain-temp/blob/master/src/components/TokenListSelect/index.tsx

- 这块比较简单，Token 余额查询使用批量查询即可，搜索可以 **本地+单独调用合约**。

  

### 合约

1. https://hardhat.org/getting-started/ 按照文垱一把梭哈（可以部署到测试网 Rinkey 等）
2. Typescript 支持 https://hardhat.org/guides/typescript.html
3. 导出 Type 方便前端使用 https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat
4. 如果想部署到 BSC 测试网 https://docs.binance.org/smart-chain/developer/deploy/hardhat.html

写了一个简单的 Demo Contract （或者使用官方例子）

```javascript
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20 Token
contract Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) public ERC20(name, symbol) {
        _mint(msg.sender, initialBalance);
    }
}

// Create ERC20 Token
contract TokenFactory {
    constructor() {}

    address[] public contracts;

    // mint
    function mint(
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) public {
        console.log("Create ERC20");
        address contractAddress = address(
            new Token(name, symbol, initialBalance)
        );
        console.log("contractAddress '%s'", contractAddress);
        contracts.push(contractAddress);
    }

    function list() public view returns (address[] memory) {
        return contracts;
    }
}
```

**总结** 两个方法 Address：0x008c5c5cb4196719cbb61050d41BeEdAF01c5726

- Mint ERC20 Token 然后保存合约地址 （mint）
- 查询 Mint 过的合约地址（list）

Compile 之后会生成 typechain 文件方便前端用，也可以自己用第三方工具快速生成 DAPP 方法调用，传入 Contract Address 和ABI就好了

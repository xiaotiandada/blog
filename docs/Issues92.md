- https://info.uniswap.org
- https://github.com/Uniswap/v3-info
- https://github.com/xiaotiandada/vv-info



- uniswap/uniswap-v3/graphql - https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3/graphql
- blocklytics/ethereum-blocks - https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks



### 查询 Tokens

/uniswap/uniswap-v3/graphql

```
{
  tokens {
    id,
    symbol,
    name
  }
}
```

```json
{
  "data": {
    "tokens": [
      {
        "id": "0x00000000000045166c45af0fc6e4cf31d9e14b9a",
        "symbol": "BID",
        "name": "TopBidder"
      },
			// ...
    ]
  }
}
```

### 查询 topPools

```
query topPools {
  tokens(
    first: 50
    orderBy: totalValueLockedUSD
    orderDirection: desc
    subgraphError: allow
  ) {
    id
    name
    symbol
    __typename
  }
}
```

```json
{
  "data": {
    "tokens": [
      {
        "id": "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
        "name": "UMIIE COIN",
        "symbol": "UMIIE",
        "__typename": "Token"
      },
      {
        "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "name": "Wrapped Ether",
        "symbol": "WETH",
        "__typename": "Token"
      },
      // ...
    ]
  }
}
```

### 查询 Tokens

```
query tokens {
  tokens(
    where: {id_in: ["0x12b32f10a499bf40db334efe04226cca00bf2d9b", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"]}
    block: {number: 14423607}
    orderBy: totalValueLockedUSD
    orderDirection: desc
    subgraphError: allow
  ) {
    id
    symbol
    name
    derivedETH
    volumeUSD
    volume
    txCount
    totalValueLocked
    feesUSD
    totalValueLockedUSD
    __typename
  }
}
```

```json
{
  "data": {
    "tokens": [
      {
        "id": "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
        "symbol": "UMIIE",
        "name": "UMIIE COIN",
        "derivedETH": "0.1003902793538328620619869326124331",
        "volumeUSD": "1511.56963205356389982056338569223",
        "volume": "1000108.86838829453580011",
        "txCount": "56",
        "totalValueLocked": "4060050843.47631394922014061",
        "feesUSD": "4.103789417232335009489830669286369",
        "totalValueLockedUSD": "1197081242711.1943889376370393552",
        "__typename": "Token"
      },
      {
        "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "symbol": "WETH",
        "name": "Wrapped Ether",
        "derivedETH": "1",
        "volumeUSD": "394329036941.5623654027733304210331",
        "volume": "125103787.712591104192372425",
        "txCount": "10826685",
        "totalValueLocked": "441402.825574432888969787",
        "feesUSD": "766412514.4017064014764513833224189",
        "totalValueLockedUSD": "1271992049.856639541792290053439463",
        "__typename": "Token"
      },
      {
        "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "symbol": "USDC",
        "name": "USD Coin",
        "derivedETH": "0.00034701696887506600425180887192684",
        "volumeUSD": "277035127783.0198627557171409059903",
        "volume": "277026881311.261403",
        "txCount": "3156306",
        "totalValueLocked": "1006710296.623717",
        "feesUSD": "305659059.6247657073983772200408159",
        "totalValueLockedUSD": "1006710296.623717",
        "__typename": "Token"
      }
    ]
  }
}
```

### 查询 blocks

```
query blocks {
  t1647783480: blocks(
    first: 1
    orderBy: timestamp
    orderDirection: desc
    where: {timestamp_gt: 1647783480, timestamp_lt: 1647784080}
  ) {
    number
    __typename
  }
  t1647697080: blocks(
    first: 1
    orderBy: timestamp
    orderDirection: desc
    where: {timestamp_gt: 1647697080, timestamp_lt: 1647697680}
  ) {
    number
    __typename
  }
  t1647265080: blocks(
    first: 1
    orderBy: timestamp
    orderDirection: desc
    where: {timestamp_gt: 1647265080, timestamp_lt: 1647265680}
  ) {
    number
    __typename
  }
}
```

```json
{
  "data": {
    "t1647783480": [
      {
        "number": "14423607",
        "__typename": "Block"
      }
    ],
    "t1647697080": [
      {
        "number": "14417197",
        "__typename": "Block"
      }
    ],
    "t1647265080": [
      {
        "number": "14385081",
        "__typename": "Block"
      }
    ]
  }
}
```

### 查询 pools

```
query pools {
  pools(
    where: {id_in: ["0xa850478adaace4c08fc61de44d8cf3b64f359bec", "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"]}
    orderBy: totalValueLockedUSD
    orderDirection: desc
    subgraphError: allow
  ) {
    id
    feeTier
    liquidity
    sqrtPrice
    tick
    token0 {
      id
      symbol
      name
      decimals
      derivedETH
      __typename
    }
    token1 {
      id
      symbol
      name
      decimals
      derivedETH
      __typename
    }
    token0Price
    token1Price
    volumeUSD
    txCount
    totalValueLockedToken0
    totalValueLockedToken1
    totalValueLockedUSD
    __typename
  }
}
```

```json
{
  "data": {
    "pools": [
      {
        "id": "0xa850478adaace4c08fc61de44d8cf3b64f359bec",
        "feeTier": "500",
        "liquidity": "1706245281880037395956227425",
        "sqrtPrice": "792049440195001924670217089101",
        "tick": "46048",
        "token0": {
          "id": "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
          "symbol": "UMIIE",
          "name": "UMIIE COIN",
          "decimals": "18",
          "derivedETH": "0.1003902793538328620619869326124331",
          "__typename": "Token"
        },
        "token1": {
          "id": "0x5ed60a121159481675bad3e648ba4c89753e056f",
          "symbol": "UMIIE2",
          "name": "Umiie 2",
          "decimals": "18",
          "derivedETH": "0",
          "__typename": "Token"
        },
        "token0Price": "0.01000586374960270227477201921193648",
        "token1Price": "99.94139686738253752770898237370869",
        "volumeUSD": "0",
        "txCount": "9",
        "totalValueLockedToken0": "50050480.103497613002904654",
        "totalValueLockedToken1": "14644676667.240849617715772909",
        "totalValueLockedUSD": "12887625156.60443191907094774602519",
        "__typename": "Pool"
      },
      {
        "id": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
        "feeTier": "3000",
        "liquidity": "13757788412751061547",
        "sqrtPrice": "1465022049799761266689268933073649",
        "tick": "196510",
        "token0": {
          "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "symbol": "USDC",
          "name": "USD Coin",
          "decimals": "6",
          "derivedETH": "0.0003419236610902688830990355549810135",
          "__typename": "Token"
        },
        "token1": {
          "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "symbol": "WETH",
          "name": "Wrapped Ether",
          "decimals": "18",
          "derivedETH": "1",
          "__typename": "Token"
        },
        "token0Price": "2924.629424039762397178342690644415",
        "token1Price": "0.0003419236610902688830990355549810135",
        "volumeUSD": "46675235734.17557247596178718271208",
        "txCount": "300573",
        "totalValueLockedToken0": "184459973.048114",
        "totalValueLockedToken1": "76505.849041123104288281",
        "totalValueLockedUSD": "408211230.2649268727637666561467565",
        "__typename": "Pool"
      }
    ]
  }
}
```

### 查询 prices

```
query prices {
  current: bundles(first: 1, subgraphError: allow) {
    ethPriceUSD
    __typename
  }
  oneDay: bundles(first: 1, block: {number: 14423607}, subgraphError: allow) {
    ethPriceUSD
    __typename
  }
  twoDay: bundles(first: 1, block: {number: 14417197}, subgraphError: allow) {
    ethPriceUSD
    __typename
  }
  oneWeek: bundles(first: 1, block: {number: 14385081}, subgraphError: allow) {
    ethPriceUSD
    __typename
  }
}
```

```json
{
  "data": {
    "current": [
      {
        "ethPriceUSD": "2911.900514205906596528906408766284",
        "__typename": "Bundle"
      }
    ],
    "oneDay": [
      {
        "ethPriceUSD": "2881.703460328542976410568122182245",
        "__typename": "Bundle"
      }
    ],
    "twoDay": [
      {
        "ethPriceUSD": "2957.208390287011377358451424105611",
        "__typename": "Bundle"
      }
    ],
    "oneWeek": [
      {
        "ethPriceUSD": "2566.212421242889978064374895815068",
        "__typename": "Bundle"
      }
    ]
  }
}
```

### 查询 transactions

```
query transactions {
  transactions(
    first: 500
    orderBy: timestamp
    orderDirection: desc
    subgraphError: allow
  ) {
    id
    timestamp
    mints {
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      owner
      sender
      origin
      amount0
      amount1
      amountUSD
      __typename
    }
    swaps {
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      origin
      amount0
      amount1
      amountUSD
      __typename
    }
    burns {
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      owner
      origin
      amount0
      amount1
      amountUSD
      __typename
    }
    __typename
  }
}
```

```json
{
  "data": {
    "transactions": [
      {
        "id": "0xd87658f56454d4bccf363af8ed720e19990d3c7a02939320ae59258fbef2aa0a",
        "timestamp": "1647872333",
        "mints": [],
        "swaps": [
          {
            "pool": {
              "token0": {
                "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "symbol": "USDC",
                "__typename": "Token"
              },
              "token1": {
                "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "symbol": "WETH",
                "__typename": "Token"
              },
              "__typename": "Pool"
            },
            "origin": "0x6e5dac0408d313c3adb78c671741df7a1944f9d5",
            "amount0": "838.639246",
            "amount1": "-0.288308585496447514",
            "amountUSD": "839.082582178541550390129466135908",
            "__typename": "Swap"
          },
          {
            "pool": {
              "token0": {
                "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "symbol": "USDC",
                "__typename": "Token"
              },
              "token1": {
                "id": "0xd5d86fc8d5c0ea1ac1ac5dfab6e529c9967a45e9",
                "symbol": "WRLD",
                "__typename": "Token"
              },
              "__typename": "Pool"
            },
            "origin": "0x6e5dac0408d313c3adb78c671741df7a1944f9d5",
            "amount0": "-838.639246",
            "amount1": "3500",
            "amountUSD": "838.639246",
            "__typename": "Swap"
          }
        ],
        "burns": [],
        "__typename": "Transaction"
      }
    ]
  }
}
```

### 查询 uniswapDayDatas

```
query uniswapDayDatas {
  uniswapDayDatas(
    first: 1000
    skip: 0
    subgraphError: allow
    where: {date_gt: 1619170975}
    orderBy: date
    orderDirection: asc
  ) {
    id
    date
    volumeUSD
    tvlUSD
    __typename
  }
}
```

```json
{
  "data": {
    "uniswapDayDatas": [
      {
        "id": "18751",
        "date": 1620086400,
        "volumeUSD": "0",
        "tvlUSD": "0",
        "__typename": "UniswapDayData"
      },
    ]
  }
}
```

### poolDayDatas

```
query poolDayDatas {
  poolDayDatas(
    first: 1000
    skip: 0
    where: {pool: "0xa850478adaace4c08fc61de44d8cf3b64f359bec", date_gt: 1619170975}
    orderBy: date
    orderDirection: asc
    subgraphError: allow
  ) {
    date
    volumeUSD
    tvlUSD
    feesUSD
    __typename
  }
}
```

```json
{
  "data": {
    "poolDayDatas": [
      {
        "date": 1625356800,
        "volumeUSD": "0",
        "tvlUSD": "0",
        "feesUSD": "0",
        "__typename": "PoolDayData"
      },
      {
        "date": 1634342400,
        "volumeUSD": "0",
        "tvlUSD": "0",
        "feesUSD": "0",
        "__typename": "PoolDayData"
      },
      {
        "date": 1646611200,
        "volumeUSD": "0",
        "tvlUSD": "261269729093.816542194433000739702",
        "feesUSD": "0",
        "__typename": "PoolDayData"
      },
      {
        "date": 1646697600,
        "volumeUSD": "0",
        "tvlUSD": "12887625156.60443191907094774602519",
        "feesUSD": "0",
        "__typename": "PoolDayData"
      }
    ]
  }
}
```


- [repo](https://github.com/xiaotiandada/look)
- [App](https://expo.dev/@xiaotiandada/AwesomeProject)
- [NativeBase](https://nativebase.io/) UI 组件库

记录一些觉得有意义的功能点

### 列表滚动

- 静态列表 不多的情况我会用 [ScrollView](https://reactnative.dev/docs/scrollview)

  ```tsx
  <ScrollView style={styles.scrollView}>
    <Text style={styles.text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </ScrollView>
  ```

- 动态加载 包含图片什么的 [flatlist](https://reactnative.dev/docs/flatlist)

```tsx
<FlatList
  data={DATA}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  />
```

- [SectionList](https://reactnative.dev/docs/sectionlist) 暂没用上

### 列表下拉刷新

```tsx
const [refreshing, setRefreshing] = useState<boolean>(false);

// refresh
const onRefresh = useCallback(
  async () => {
    // do something
  }, []);


<FlatList
  ref={refFlatList}
  numColumns={2}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
// ...
```

FlatList 继承了 ScrollView 所以 ScrollView 也一样



### 列表上拉加载

```tsx
// more load components
const RenderLoadMoreView = () => {
  return <View style={styles.loadMore}>
    <ActivityIndicator
      style={styles.indicator}
      size={"small"}
      animating={true}
      />
    <Text>Loading...</Text>
  </View>
};

const fetchCosplayMore = useCallback(
  async () => {
    // do something
  }, []);


<FlatList
  ref={refFlatList}
  numColumns={2}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  ListFooterComponent={() => RenderLoadMoreView()}
  onEndReached={() => fetchCosplayMore()}
  
  // ...
```



### 列表滚动

```tsx
const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
  // do something
}, []);

<FlatList
  ref={refFlatList}
  numColumns={2}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  ListFooterComponent={() => RenderLoadMoreView()}
  onEndReached={() => fetchCosplayMore()}
  onScroll={handleScroll}
```



### 图片保存 ios

```tsx
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const handleDownload = useCallback(
    async (url: string): Promise<void> => {
      // libraryPermissionResult Object {
      //   "accessPrivileges": "none",
      //   "canAskAgain": false,
      //   "expires": "never",
      //   "granted": false,
      //   "status": "denied",
      // }
	
      // copy doc 不太需要
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          // Alert.alert('Sorry, we need media library permissions to make this work!');
          // return
        }
      } else {
        console.log('no support web')
        return
      }
			
      // 好像是这个权限 后来不知道怎么清空权限重新获取一下
      const libraryPermissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()
      console.log('libraryPermissionResult', libraryPermissionResult)
      // ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly)

      // Get permission
      if (libraryPermissionResult.accessPrivileges === 'none' && libraryPermissionResult.status !== 'granted') {
        await ImagePicker.requestMediaLibraryPermissionsAsync(true)

        const _libraryPermissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()
        console.log('_libraryPermissionResult', _libraryPermissionResult)

        if (_libraryPermissionResult.accessPrivileges === 'none' && _libraryPermissionResult.status !== 'granted') {
          return
        }
      }

      // Save
      try {
        // encode 因为图片 url 有中文 会报错
        await MediaLibrary.saveToLibraryAsync(encodeURI(url))
        Alert.alert('Saved successfully')

      } catch (error) {
        console.log('error', error)
        Alert.alert('Save failed')
      }
    }, [])
```

> 先跑了个流程

### ActionSheetIOS

```tsx
import { ActionSheetIOS } from 'react-native';

const onPress = () =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Generate number", "Reset"],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        setResult(Math.floor(Math.random() * 100) + 1);
      } else if (buttonIndex === 2) {
        setResult("🔮");
      }
    }
  );
```

会弹出一个菜单



### Share

```tsx
import { Share } from 'react-native';
const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
```

会出现一个 分享 菜单，和 expo share sdk 有什么区别我还不知道 https://docs.expo.dev/versions/latest/react-native/share/

### 返回到顶部

```tsx
// TODO: type fix
const refFlatList = useRef<any>(null);

// go top
const goToTop = useCallback(() => {
  // 后来看见的 懒得试
  // https://reactnavigation.org/docs/use-scroll-to-top
  refFlatList.current.scrollToOffset({ offset: 0 });
}, [refFlatList]);


<FlatList
  ref={refFlatList}
```

reactnavigation 文档也提到了这个功能

### react-navigation

https://reactnavigation.org/

- navigation.navigate('Detail') 只会产生一条记录

- navigation.push('Detail') 会产出N条记录

- useFocusEffect

  ```tsx
  useFocusEffect(
    useCallback(() => {
      const fetch = () => something()
      fetch()
    }, [])
  );
  ```

- params ``navigation.navigate('Detail', params)``
- ...

### 背景渐变

```tsx
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.button}>
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({ ... }); 
```


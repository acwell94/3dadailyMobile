import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/screens/main/MainScreen";
import SignInScreen from "./src/screens/signIn/SignInScreen";
import CustomHeader from "./src/components/items/CustomHeader";
import SignUpScreen from "./src/screens/signUp/SignUpScreen";
import FindIdScreen from "./src/screens/findId/FindIdScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import DetailScreen from "./src/screens/detail/DetailScreen";
import ProfileScreen from "./src/screens/setting/ProfileScreen";
import EditProfileScreen from "./src/screens/setting/EditProfileScreen";
import FriendListScreen from "./src/screens/setting/FriendListScreen";
import EditPasswordScreen from "./src/screens/setting/EditPasswordScreen";
import EditContentsScreen from "./src/screens/edit/EditContentsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          spoqaB: require("./assets/fonts/SpoqaHanSansNeoBold.otf"),
          spoqaM: require("./assets/fonts/SpoqaHanSansNeoMedium.otf"),
          spoqaR: require("./assets/fonts/SpoqaHanSansNeoRegular.otf"),
          spoqaT: require("./assets/fonts/SpoqaHanSansNeoThin.otf"),
        });
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, []);

  if (!appIsReady) {
    return <View></View>;
  }

  return (
    <RecoilRoot>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "?????????",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="?????????" />,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: "????????????",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="????????????" />,
                }}
              />
              <Stack.Screen
                name="FindId"
                component={FindIdScreen}
                options={{
                  title: "???????????????",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="???????????????" />,
                }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                  title: "",
                  contentStyle: {
                    paddingTop: 15,
                    backgroundColor: "white",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SettingProfile"
                component={ProfileScreen}
                options={{
                  title: "",
                  contentStyle: {
                    paddingTop: 15,
                    backgroundColor: "white",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SettingEditProfile"
                component={EditProfileScreen}
                options={{
                  title: "",
                  contentStyle: {
                    paddingTop: 15,
                    backgroundColor: "white",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FriendList"
                component={FriendListScreen}
                options={{
                  title: "",
                  contentStyle: {
                    paddingTop: 15,
                    backgroundColor: "white",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EditPassword"
                component={EditPasswordScreen}
                options={{
                  title: "",
                  contentStyle: {
                    paddingTop: 15,
                    backgroundColor: "white",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EditContents"
                component={EditContentsScreen}
                options={{
                  header: () => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 50,
                        paddingBottom: 20,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Image
                        style={{ width: 180, height: 50 }}
                        source={require("@assets/logo.png")}
                      />
                    </View>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

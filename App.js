import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/screens/main/MainScreen";
import SignInScreen from "./src/screens/signIn/SignInScreen";
import CustomHeader from "./src/components/items/CustomHeader";
import SignUpScreen from "./src/screens/signUp/SignUpScreen";
import FindIdScreen from "./src/screens/findId/FindIdScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import DetailScreen from "./src/screens/detail/DetailScreen";
import ProfileScreen from "./src/screens/setting/ProfileScreen";

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
                  title: "로그인",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="로그인" />,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: "회원가입",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="회원가입" />,
                }}
              />
              <Stack.Screen
                name="FindId"
                component={FindIdScreen}
                options={{
                  title: "아이디찾기",
                  contentStyle: {
                    paddingTop: 40,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                  },
                  header: () => <CustomHeader title="아이디찾기" />,
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

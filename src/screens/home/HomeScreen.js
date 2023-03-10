import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../../utils/theme";
import Home from "./bottomTap/Home";
import Write from "./bottomTap/Write";
import Setting from "./bottomTap/Setting";
import { useRecoilState } from "recoil";
import { userState } from "../../components/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACK_API } from "react-native-dotenv";
import axios from "axios";
import { useEffect } from "react";
const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  const [_, setUserInfo] = useRecoilState(userState);

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const user = await AsyncStorage.getItem("data");
    try {
      const { data } = await axios.get(
        `${BACK_API}users/findUser/${JSON.parse(user).email}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      setUserInfo({
        name: data.foundUser.name,
        userId: data.foundUser.id,
        profileImg: data.foundUser.profileImg,
        email: data.foundUser.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="홈"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: `${theme.colors.darkPurple}`,
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 12,
          fontFamily: "spoqaB",
        },
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
              style={styles.logoImage}
              source={require("@assets/logo.png")}
            />
          </View>
        ),
        tabBarStyle: {
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarItemStyle: {
          alignContent: "center",
        },
        tabBarLabelStyle: {},
      }}
    >
      <BottomTab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.bottomIconImage}
              source={
                focused
                  ? require("@assets/icons/bottomTab/bottomHomeIconFocused.png")
                  : require("@assets/icons/bottomTab/bottomHomeIcon.png")
              }
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 12,
            fontFamily: "spoqaB",
          },
        }}
      />
      <BottomTab.Screen
        name="글쓰기"
        component={Write}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.bottomIconImage}
              source={
                focused
                  ? require("@assets/icons/bottomTab/bottomWriteIconFocused.png")
                  : require("@assets/icons/bottomTab/bottomWriteIcon.png")
              }
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 12,
            fontFamily: "spoqaB",
          },
        }}
      />
      <BottomTab.Screen
        name="설정"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.bottomIconImage}
              source={
                focused
                  ? require("@assets/icons/bottomTab/bottomSettingIconFocused.png")
                  : require("@assets/icons/bottomTab/bottomSettingIcon.png")
              }
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 12,
            fontFamily: "spoqaB",
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomIconImage: {
    width: 18,
    height: 18,
  },
  logoImage: {
    width: 180,
    height: 50,
  },
});

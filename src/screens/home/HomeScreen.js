import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../../utils/theme";
import Home from "./bottomTap/Home";
import Write from "./bottomTap/Write";
import Setting from "./bottomTap/Setting";

const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
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
          height: 72,
          paddingTop: 10,
          paddingBottom: 10,
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
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomIconImage: {
    width: 22,
    height: 22,
  },
  logoImage: {
    width: 180,
    height: 50,
  },
});

import { LinearGradient } from "expo-linear-gradient";
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
// import RoundBtn from "@components/buttons/roundBtn";
import theme from "@utils/theme";
import RoundBtn from "../../components/buttons/roundBtn";
import useNav from "../../components/hooks/useNav";

const MainScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <LinearGradient
        colors={[
          `${theme.colors.mainPurple}`,
          `${theme.colors.mainPurple}`,
          `${theme.colors.linerPink}`,
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <Image style={styles.mainImage} source={require("@assets/main.png")} />
        <View style={styles.buttonsBox}>
          <RoundBtn
            onPress={useNav("SignUp")}
            btnStyle={{
              marginBottom: 16,
              backgroundColor: `${theme.colors.white}`,
            }}
            txtStyle={{
              color: `${theme.colors.darkPurple}`,
            }}
            text="회원가입"
          />
          <RoundBtn
            onPress={useNav("SignIn")}
            btnStyle={{
              backgroundColor: `${theme.colors.darkPurple}`,
            }}
            txtStyle={{
              color: `${theme.colors.white}`,
            }}
            text="로그인"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: 220,
    height: 210,
    marginBottom: 48,
  },
  buttonsBox: {
    width: 220,
  },
});

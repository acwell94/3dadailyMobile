import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserFlowBtn from "../../components/buttons/userFlowBtn";
import useNav from "../../components/hooks/useNav";
import UserFlowInput from "../../components/inputs/userFlowInput";
import theme from "../../utils/theme";

const SignInScreen = () => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const changeSignInFormHandler = (e, name) => {
    const {
      nativeEvent: { text },
    } = e;
    setSignInForm((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  const toastTest = () => {
    // console.log("hi");
    // ToastAndroid.showWithGravityAndOffset(
    //   "로그인",
    //   ToastAndroid.SHORT,
    //   ToastAndroid.BOTTOM,
    //   0,
    //   800
    // );
    navigation.navigate("Home");
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <UserFlowInput
              ref={emailRef}
              placeholder=" 이메일"
              keyboardType="email-address"
              error={error.emailError}
              errorText="이메일을 확인해 주세요."
              style={{ marginBottom: 14 }}
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              onChange={(e) => changeSignInFormHandler(e, "email")}
            />
            <UserFlowInput
              ref={passwordRef}
              placeholder=" 비밀번호"
              secureTextEntry={true}
              error={error.passwordError}
              errorText="비밀번호를 확인해 주세요."
              onChange={(e) => changeSignInFormHandler(e, "password")}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.infoBox}>
          <Pressable
            style={{
              height: "100%",
              justifyContent: "center",
            }}
            onPress={useNav("FindId")}
          >
            <Text style={[styles.infoText, styles.infoTextBorder]}>
              아이디 찾기
            </Text>
          </Pressable>
          <Pressable
            style={{
              height: "100%",
              justifyContent: "center",
            }}
            onPress={useNav("SignUp")}
          >
            <Text style={[styles.infoText]}>회원가입</Text>
          </Pressable>
        </View>
        <UserFlowBtn
          text="로그인"
          isComplete={signInForm.email && signInForm.password}
          onPress={toastTest}
        />
      </View>
    </Pressable>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    height: 50,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "spoqaM",
    color: `${theme.colors.lightGray}`,
  },
  infoTextBorder: {
    borderRightWidth: 1,
    borderRightColor: `${theme.colors.lightGray}`,
    paddingRight: 30,
    marginRight: 30,
  },
});

import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserFlowBtn from "../../components/buttons/UserFlowBtn";
import useNav from "../../components/hooks/useNav";
import UserFlowInput from "../../components/inputs/UserFlowInput";
import theme from "../../utils/theme";

const SignUpScreen = () => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const changeSignUpFormHandler = (e, name) => {
    const {
      nativeEvent: { text },
    } = e;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: text,
    }));
    isValidData(text, name);
  };

  const isValidData = (data, name) => {
    if (name === "name") {
      const valid = /^[\w\W]{2,6}$/.test(data);
      setError((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }
    if (name === "email") {
      const valid = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(data);

      setError((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }
    if (name === "password") {
      const valid =
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/.test(
          data
        );
      setError((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }
  };

  useEffect(() => {
    const passwordValid = signUpForm.password === signUpForm.passwordConfirm;
    setError((prev) => ({
      ...prev,
      passwordConfirm: !passwordValid,
    }));
  }, [signUpForm.password, signUpForm.passwordConfirm]);

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{}} behavior="position">
          <ScrollView
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <UserFlowInput
              placeholder=" 닉네임"
              keyboardType="email-address"
              error={error.name}
              errorText="2글자 이상 6글자 사이로 입력해 주세요."
              style={{ marginBottom: 14 }}
              onChange={(e) => changeSignUpFormHandler(e, "name")}
            />
            <UserFlowInput
              placeholder=" 이메일"
              error={error.email}
              keyboardType="email-address"
              errorText="이메일 형식을 확인해 주세요."
              style={{ marginBottom: 14 }}
              onChange={(e) => changeSignUpFormHandler(e, "email")}
            />
            <UserFlowInput
              placeholder=" 비밀번호"
              error={error.password}
              secureTextEntry={true}
              errorText="비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
              style={{ marginBottom: 14 }}
              onChange={(e) => changeSignUpFormHandler(e, "password")}
            />
            <UserFlowInput
              placeholder=" 비밀번호 확인"
              error={error.passwordConfirm}
              secureTextEntry={true}
              errorText="비밀번호가 일치하지 않습니다."
              onChange={(e) => changeSignUpFormHandler(e, "passwordConfirm")}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.infoBox}>
          <Pressable>
            <Text style={[styles.infoTextLeft]}>이미 회원이신가요?</Text>
          </Pressable>
          <Pressable
            style={{
              height: "100%",
              justifyContent: "center",
            }}
            onPress={useNav("SignIn")}
          >
            <Text style={styles.infoTextRight}>로그인하러가기</Text>
          </Pressable>
        </View>
        <UserFlowBtn
          text="회원가입"
          isComplete={
            signUpForm.name &&
            signUpForm.email &&
            signUpForm.password &&
            signUpForm.passwordConfirm
          }
        />
      </View>
    </Pressable>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    height: 50,
  },
  infoTextLeft: {
    fontSize: 14,
    fontFamily: "spoqaM",
    color: `${theme.colors.lightGray}`,
    marginRight: 16,
  },
  infoTextRight: {
    fontSize: 14,
    fontFamily: "spoqaM",
  },
});

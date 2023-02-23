import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import mime from "mime";
import UserFlowBtn from "../../components/buttons/UserFlowBtn";
import useNav from "../../components/hooks/useNav";
import UserFlowInput from "../../components/inputs/UserFlowInput";
import theme from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../../components/modal/ConfirmModal";
import useImageUpload from "../../components/hooks/useImageUpload";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [signUpError, setSignUpError] = useState("");
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
  const { image, pickHandler } = useImageUpload();
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

  const closeModalHandler = useCallback(() => {
    setErrorModalVisible((prev) => !prev);
  }, []);

  const signUpHandler = async () => {
    setIsLoading((prev) => !prev);
    try {
      const newImageUri = "file:///" + image.split("file:/").join("");
      const formData = new FormData();

      formData.append("name", signUpForm.name);
      formData.append("email", signUpForm.email);
      formData.append("password", signUpForm.password);
      formData.append("profileImg", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      const { data } = await axios.post(`${BACK_API}users/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data) {
        const { data } = await axios.post(`${BACK_API}users/login`, {
          email: signUpForm.email,
          password: signUpForm.password,
        });
        await AsyncStorage.setItem(
          "data",
          JSON.stringify({
            userId: data.userId,
            email: data.email,
            name: data.name,
          })
        );
        await AsyncStorage.setItem("accessToken", JSON.stringify(data.token));
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(data.refreshToken)
        );
        setIsLoading((prev) => !prev);
        navigation.reset({ routes: [{ name: "Home" }] });
      }
    } catch (err) {
      setIsLoading((prev) => !prev);
      setSignUpError("이미 존재하는 이메일입니다.");
      setErrorModalVisible((prev) => !prev);
    }
  };

  return (
    <>
      <ConfirmModal
        isVisible={errorModalVisible}
        closeModalHandler={closeModalHandler}
        title={signUpError}
      />
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{}} behavior="position">
            <ScrollView
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <Pressable style={styles.profileImgBox} onPress={pickHandler}>
                {image ? (
                  <View>
                    <Image style={styles.profileImg} source={{ uri: image }} />
                    <Image
                      style={styles.editIcon}
                      source={require("@assets/icons/profileEditIcon.png")}
                    />
                  </View>
                ) : (
                  <View style={styles.profileDefaultImgBox}>
                    <Image
                      style={styles.defaultProfileImg}
                      source={require("@assets/icons/editProfile.png")}
                    />
                    <Image
                      style={styles.editIcon}
                      source={require("@assets/icons/profileEditIcon.png")}
                    />
                  </View>
                )}
              </Pressable>
              <UserFlowInput
                ref={nameRef}
                placeholder=" 닉네임"
                error={error.name}
                errorText="2글자 이상 6글자 사이로 입력해 주세요."
                style={{ marginBottom: 14 }}
                onSubmitEditing={() => {
                  emailRef.current.focus();
                }}
                onChange={(e) => changeSignUpFormHandler(e, "name")}
                returnKeyType="next"
              />
              <UserFlowInput
                ref={emailRef}
                placeholder=" 이메일"
                error={error.email}
                keyboardType="email-address"
                errorText="이메일 형식을 확인해 주세요."
                style={{ marginBottom: 14 }}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
                onChange={(e) => changeSignUpFormHandler(e, "email")}
                returnKeyType="next"
              />
              <UserFlowInput
                ref={passwordRef}
                placeholder=" 비밀번호"
                error={error.password}
                secureTextEntry={true}
                errorText="비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
                style={{ marginBottom: 14 }}
                onSubmitEditing={() => {
                  passwordConfirmRef.current.focus();
                }}
                onChange={(e) => changeSignUpFormHandler(e, "password")}
                returnKeyType="next"
              />
              <UserFlowInput
                ref={passwordConfirmRef}
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
              signUpForm.passwordConfirm &&
              image
            }
            onPress={signUpHandler}
            isLoading={isLoading}
          />
        </View>
      </Pressable>
    </>
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
  profileImgBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileDefaultImgBox: {
    position: "relative",
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  defaultProfileImg: {
    width: 120,
    height: 120,
  },
  editIcon: {
    width: 36,
    height: 36,
    position: "absolute",
    bottom: 10,
    right: 2,
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

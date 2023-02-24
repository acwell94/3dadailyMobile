import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import FullWidthButton from "../../components/buttons/FullWidthButton";
import EditInputBox from "../../components/items/EditInputBox";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useAuth from "../../components/hooks/useAuth";
import useLogout from "../../components/hooks/useLogout";
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../../components/modal/ConfirmModal";
const EditPasswordScreen = ({ route }) => {
  useAuth();
  const { logout } = useLogout();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [formError, setFormError] = useState({
    password: false,
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [failModalText, setFailModalText] = useState("");

  const changePasswordFormHandler = (e, name) => {
    const {
      nativeEvent: { text },
    } = e;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: text,
    }));
    isValidData(text, name);
  };

  const isValidData = (data, name) => {
    if (name === "password") {
      const valid = data !== "";
      setFormError((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }
    if (name === "newPassword") {
      const valid =
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/.test(
          data
        );
      setFormError((prev) => ({
        ...prev,
        [name]: !valid,
      }));
    }
  };

  useEffect(() => {
    const passwordValid =
      passwordForm.newPassword === passwordForm.newPasswordConfirm;
    setFormError((prev) => ({
      ...prev,
      newPasswordConfirm: !passwordValid,
    }));
  }, [passwordForm.newPassword, passwordForm.newPasswordConfirm]);

  const changePassword = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoading((prev) => !prev);
    try {
      await axios.patch(
        `${BACK_API}users/resetPassword/${userId}`,
        {
          password: passwordForm.password,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setIsLoading((prev) => !prev);
      setSuccessModalVisible((prev) => !prev);
    } catch (err) {
      console.log(err);
      setIsLoading((prev) => !prev);
      setFailModalText(err.response.data.message);
      setFailModalVisible((prev) => !prev);
    }
  };

  const successModalHandler = useCallback(() => {
    setSuccessModalVisible((prev) => !prev);
    logout();
    navigation.reset({ routes: [{ name: "Main" }] });
  }, [changePassword]);

  const failModalHandler = useCallback(() => {
    setFailModalVisible((prev) => !prev);
  }, [changePassword]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ConfirmModal
        isVisible={successModalVisible}
        title={`비밀번호가 변경되었습니다.${"\n"}로그인페이지로 이동합니다.`}
        closeModalHandler={successModalHandler}
      />
      <ConfirmModal
        isVisible={failModalVisible}
        title={failModalText}
        closeModalHandler={failModalHandler}
      />
      <HeaderBackBtn title="비밀번호 재설정" />
      <KeyboardAvoidingView behavior="padding">
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <EditInputBox
            title="현재 비밀번호"
            secureTextEntry={true}
            style={{ marginBottom: 14 }}
            defaultData="비밀번호"
            error={formError.password}
            errorText="비밀번호를 입력해 주세요."
            onChange={(e) => changePasswordFormHandler(e, "password")}
          />
          <EditInputBox
            title="새로운 비밀번호"
            secureTextEntry={true}
            style={{ marginBottom: 14 }}
            defaultData="비밀번호"
            error={formError.newPassword}
            errorText="비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
            onChange={(e) => changePasswordFormHandler(e, "newPassword")}
          />
          <EditInputBox
            title="비밀번호 확인"
            secureTextEntry={true}
            style={{ marginBottom: 14 }}
            defaultData="비밀번호 확인"
            error={formError.newPasswordConfirm}
            errorText="비밀번호가 일치하지 않습니다."
            onChange={(e) => changePasswordFormHandler(e, "newPasswordConfirm")}
          />
        </View>
      </KeyboardAvoidingView>
      <FullWidthButton
        buttonTitle="비밀번호 변경"
        isLoading={isLoading}
        onPress={changePassword}
        isDisabled={
          !(
            passwordForm.newPassword &&
            passwordForm.password &&
            passwordForm.newPasswordConfirm
          )
        }
      />
    </View>
  );
};

export default EditPasswordScreen;

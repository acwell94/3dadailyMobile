import { KeyboardAvoidingView, Text, View } from "react-native";
import FullWidthButton from "../../components/buttons/FullWidthButton";
import EditInputBox from "../../components/items/EditInputBox";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";

const EditPasswordScreen = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <HeaderBackBtn title="비밀번호 재설정" />
      <KeyboardAvoidingView behavior="padding">
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <EditInputBox
            title="현재 비밀번호"
            style={{ marginBottom: 24 }}
            defaultData="비밀번호"
          />
          <EditInputBox
            title="새로운 비밀번호"
            style={{ marginBottom: 24 }}
            defaultData="비밀번호"
          />
          <EditInputBox
            title="비밀번호 확인"
            style={{ marginBottom: 24 }}
            defaultData="비밀번호 확인"
          />
        </View>
      </KeyboardAvoidingView>
      <FullWidthButton buttonTitle="비밀번호 변경" />
    </View>
  );
};

export default EditPasswordScreen;

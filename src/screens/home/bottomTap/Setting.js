import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import useNav from "../../../components/hooks/useNav";
import SettingBox from "../../../components/items/SettingBox";
import SettingProfileBox from "../../../components/items/SettingProfileBox";
import AskModal from "../../../components/modal/AskModal";
import theme from "../../../utils/theme";

const Setting = () => {
  const navigation = useNavigation();
  const [logoutModalIsVisible, setLogoutModalIsVisible] = useState(false);
  const [withDrawerModalIsVisible, setWithDrawerModalIsVisible] =
    useState(false);
  const logoutModalHandler = () => {
    setLogoutModalIsVisible((prev) => !prev);
  };
  const withDrawerModalHandler = () => {
    setWithDrawerModalIsVisible((prev) => !prev);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
      <AskModal
        isVisible={logoutModalIsVisible}
        closeModalHandler={logoutModalHandler}
        firstText="정말 로그아웃"
        secondText="하시겠습니까?"
        optionTitle="로그아웃"
      />
      <AskModal
        isVisible={withDrawerModalIsVisible}
        closeModalHandler={withDrawerModalHandler}
        firstText="정말 삼다일기를"
        secondText="탈퇴하시겠습니까?"
        warningText={`모든 정보는 삭제되며${"\n"}복구가 불가능합니다.`}
        optionTitle="로그아웃"
      />
      <SettingProfileBox
        onPress={() => navigation.navigate("SettingProfile")}
      />
      <SettingBox
        title="친구관리"
        onPress={() => navigation.navigate("FriendList")}
      />
      <SettingBox
        title="비밀번호 재설정"
        onPress={() => navigation.navigate("EditPassword")}
      />
      <SettingBox title="로그아웃" onPress={logoutModalHandler} />
      <SettingBox
        title="회원탈퇴"
        onPress={withDrawerModalHandler}
        style={{ color: `${theme.colors.red}` }}
      />
    </View>
  );
};

export default Setting;

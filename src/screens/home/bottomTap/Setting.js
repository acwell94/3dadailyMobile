import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import useNav from "../../../components/hooks/useNav";
import SettingBox from "../../../components/items/SettingBox";
import SettingProfileBox from "../../../components/items/SettingProfileBox";
import theme from "../../../utils/theme";

const Setting = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
      <SettingProfileBox
        onPress={() => navigation.navigate("SettingProfile")}
      />
      <SettingBox title="친구관리" />
      <SettingBox title="비밀번호 재설정" />
      <SettingBox title="로그아웃" />
      <SettingBox title="회원탈퇴" style={{ color: `${theme.colors.red}` }} />
    </View>
  );
};

export default Setting;

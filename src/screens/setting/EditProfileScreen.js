import { Text, View } from "react-native";
import FullWidthButton from "../../components/buttons/FullWidthButton";
import EditProfileBox from "../../components/items/EditProfileBox";
import EditProfileImage from "../../components/items/EditProfileImage";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";

const EditProfileScreen = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <HeaderBackBtn title="프로필 수정" />
      <EditProfileImage />
      <View style={{ paddingHorizontal: 24 }}>
        <EditProfileBox title="닉네임" defaultData=" 김민영" />
      </View>

      <FullWidthButton buttonTitle="수정하기" />
    </View>
  );
};

export default EditProfileScreen;

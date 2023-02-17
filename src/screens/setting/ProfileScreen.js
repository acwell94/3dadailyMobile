import { View } from "react-native";
import EditProfileImage from "../../components/items/EditProfileImage";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import ProfileBox from "../../components/items/ProfileBox";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBackBtn title="프로필 관리" rightText="수정" />
      <EditProfileImage />
      <View style={{ paddingHorizontal: 24 }}>
        <ProfileBox title="닉네임" content="김민영" />
        <ProfileBox title="이메일" content="leminyoung@naver.com" />
      </View>
    </View>
  );
};

export default ProfileScreen;

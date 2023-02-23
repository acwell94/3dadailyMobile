import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import EditProfileImage from "../../components/items/EditProfileImage";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import ProfileBox from "../../components/items/ProfileBox";

const ProfileScreen = ({ route }) => {
  const { email, name, profileImg } = route.params.userInfo;

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <HeaderBackBtn
        title="프로필 관리"
        rightText="수정"
        rightBtnHandler={() => navigation.navigate("SettingEditProfile")}
      />
      <EditProfileImage profileImg={profileImg} />
      <View style={{ paddingHorizontal: 24 }}>
        <ProfileBox title="닉네임" content={name} />
        <ProfileBox title="이메일" content={email} />
      </View>
    </View>
  );
};

export default ProfileScreen;

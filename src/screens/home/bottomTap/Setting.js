import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import useLogout from "../../../components/hooks/useLogout";
import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SettingBox from "../../../components/items/SettingBox";
import SettingProfileBox from "../../../components/items/SettingProfileBox";
import AskModal from "../../../components/modal/AskModal";
import { userState } from "../../../components/store";
import theme from "../../../utils/theme";
import ConfirmModal from "../../../components/modal/ConfirmModal";

const Setting = () => {
  const navigation = useNavigation();
  const { logout } = useLogout();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [logoutModalIsVisible, setLogoutModalIsVisible] = useState(false);
  const [withDrawerModalIsVisible, setWithDrawerModalIsVisible] =
    useState(false);

  const logoutModalHandler = () => {
    setLogoutModalIsVisible((prev) => !prev);
  };
  const withDrawerModalHandler = () => {
    setWithDrawerModalIsVisible((prev) => !prev);
  };

  const withDrawerUserHandler = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    try {
      await axios.delete(`${BACK_API}users/${userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const keys = ["data", "accessToken", "refreshToken"];
      try {
        await AsyncStorage.multiRemove(keys);
        navigation.reset({ routes: [{ name: "Main" }] });
      } catch (err) {
        console.log(err);
      }
      setWithDrawerModalIsVisible((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
      <AskModal
        isVisible={logoutModalIsVisible}
        closeModalHandler={logoutModalHandler}
        firstText="정말 로그아웃"
        secondText="하시겠습니까?"
        optionHandler={logout}
        optionTitle="로그아웃"
      />
      <AskModal
        isVisible={withDrawerModalIsVisible}
        closeModalHandler={withDrawerModalHandler}
        firstText="정말 삼다일기를"
        secondText="탈퇴하시겠습니까?"
        warningText={`모든 정보는 삭제되며${"\n"}복구가 불가능합니다.`}
        optionHandler={withDrawerUserHandler}
        optionTitle="로그아웃"
      />

      <SettingProfileBox
        name={userInfo.name}
        profileImg={userInfo.profileImg}
        onPress={() => navigation.navigate("SettingProfile", { userInfo })}
      />
      <SettingBox
        title="친구관리"
        onPress={() => navigation.navigate("FriendList", { userInfo })}
      />
      <SettingBox
        title="비밀번호 재설정"
        onPress={() =>
          navigation.navigate("EditPassword", { userId: userInfo.userId })
        }
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

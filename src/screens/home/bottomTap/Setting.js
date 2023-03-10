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
        firstText="?????? ????????????"
        secondText="???????????????????"
        optionHandler={logout}
        optionTitle="????????????"
      />
      <AskModal
        isVisible={withDrawerModalIsVisible}
        closeModalHandler={withDrawerModalHandler}
        firstText="?????? ???????????????"
        secondText="?????????????????????????"
        warningText={`?????? ????????? ????????????${"\n"}????????? ??????????????????.`}
        optionHandler={withDrawerUserHandler}
        optionTitle="????????????"
      />

      <SettingProfileBox
        name={userInfo.name}
        profileImg={userInfo.profileImg}
        onPress={() => navigation.navigate("SettingProfile", { userInfo })}
      />
      <SettingBox
        title="????????????"
        onPress={() => navigation.navigate("FriendList", { userInfo })}
      />
      <SettingBox
        title="???????????? ?????????"
        onPress={() =>
          navigation.navigate("EditPassword", { userId: userInfo.userId })
        }
      />
      <SettingBox title="????????????" onPress={logoutModalHandler} />
      <SettingBox
        title="????????????"
        onPress={withDrawerModalHandler}
        style={{ color: `${theme.colors.red}` }}
      />
    </View>
  );
};

export default Setting;

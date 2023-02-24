import { BACK_API } from "react-native-dotenv";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "react-native";
import useIsExpiredToken from "./useIsExpiredToken";
import { useEffect } from "react";

const useAuth = () => {
  const navigation = useNavigation();

  const checkUser = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const isExpired = await useIsExpiredToken(JSON.parse(accessToken));

    if (isExpired) {
      try {
        const response = await axios.post(`${BACK_API}users/checkUser`, {
          refresh: JSON.parse(refreshToken),
        });
        const { token } = response.data;
        await AsyncStorage.setItem("accessToken", JSON.stringify(token));
      } catch (err) {
        Alert.alert("인증이 만료되었습니다.", "로그인 페이지로 이동합니다.", [
          {
            text: "이동",
            onPress: () => {
              navigation.reset({ routes: [{ name: "Main" }] });
            },
          },
        ]);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
};

export default useAuth;

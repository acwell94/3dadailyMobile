import { BACK_API } from "react-native-dotenv";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert } from "react-native";

const useAuth = () => {
  const navigation = useNavigation();

  const checkUser = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!accessToken) {
      Alert.alert("로그인 후 이용해 주세요.", "로그인 페이지로 이동합니다.", [
        {
          text: "이동",
          onPress: () => {
            navigation.reset({ routes: [{ name: "Main" }] });
          },
        },
      ]);
    } else {
      try {
        const data = await axios.post(
          `${BACK_API}users/token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
          }
        );
      } catch (err) {
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
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
};

export default useAuth;

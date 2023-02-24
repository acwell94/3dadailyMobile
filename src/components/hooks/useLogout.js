import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const useLogout = () => {
  const navigation = useNavigation();

  const logout = async () => {
    const keys = ["data", "accessToken", "refreshToken"];
    try {
      await AsyncStorage.multiRemove(keys);
      navigation.reset({ routes: [{ name: "Main" }] });
    } catch (err) {
      console.log(err);
    }
  };
  return { logout };
};

export default useLogout;

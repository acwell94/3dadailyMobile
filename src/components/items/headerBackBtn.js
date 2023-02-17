import { useNavigation } from "@react-navigation/native";
import { Image, Pressable } from "react-native";

const HeaderBackBtn = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        width: 50,
        justifyContent: "center",
        paddingVertical: 20,
        paddingLeft: 24,
      }}
      onPress={() => navigation.goBack()}
    >
      <Image
        style={{ width: 9, height: 16 }}
        source={require("@assets/icons/backBtn.png")}
      />
    </Pressable>
  );
};
export default HeaderBackBtn;

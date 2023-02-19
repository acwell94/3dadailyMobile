import { Image, StyleSheet, Text, View } from "react-native";
import FriendListButton from "../buttons/FriendListButton";

const FriendProfile = ({ name, btnTitle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.profileImg}
          source={require("@assets/testImage/testImg.png")}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <FriendListButton title={btnTitle} />
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  profileImg: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontFamily: "spoqaR",
    fontSize: 16,
  },
});

import { Image, StyleSheet, Text, View } from "react-native";
import FriendListButton from "../buttons/FriendListButton";

const FriendProfile = ({ name, btnTitle, profileImg, onPress }) => {
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
          source={
            profileImg
              ? { uri: profileImg }
              : require("@assets/icons/defaultProfile.png")
          }
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <FriendListButton title={btnTitle} onPress={onPress} />
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

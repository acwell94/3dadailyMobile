import { Image, Pressable, StyleSheet, View } from "react-native";

const EditProfileImage = () => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        marginBottom: 24,
      }}
    >
      <Pressable style={{ position: "relative" }}>
        <Image
          style={styles.profileImg}
          source={require("@assets/icons/editProfile.png")}
        />
        <Image
          style={styles.editIcon}
          source={require("@assets/icons/profileEditIcon.png")}
        />
      </Pressable>
    </View>
  );
};

export default EditProfileImage;

const styles = StyleSheet.create({
  profileImg: {
    width: 120,
    height: 120,
  },
  editIcon: {
    width: 36,
    height: 36,
    position: "absolute",
    bottom: 10,
    right: 2,
  },
});

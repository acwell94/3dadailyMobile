import { Image, Pressable, StyleSheet, View } from "react-native";

const EditProfileImage = ({ profileImg, onPress, editImage }) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        marginBottom: 24,
      }}
    >
      <Pressable style={{ position: "relative" }} onPress={onPress}>
        {editImage ? (
          <Image style={styles.profileImg} source={{ uri: editImage }} />
        ) : (
          <Image
            style={styles.profileImg}
            source={
              profileImg
                ? { uri: profileImg }
                : require("@assets/icons/editProfile.png")
            }
          />
        )}
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
    borderRadius: 60,
  },
  editIcon: {
    width: 36,
    height: 36,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

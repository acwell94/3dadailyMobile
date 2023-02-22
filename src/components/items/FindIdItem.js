import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const FindIdItem = ({ image, name, email }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImg}
        source={
          image ? { uri: image } : require("@assets/icons/defaultProfile.png")
        }
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

export default FindIdItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  profileImg: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  name: {
    marginRight: 8,
    fontFamily: "spoqaB",
    color: `${theme.colors.middleGray}`,
    fontSize: 16,
  },
  email: {
    fontFamily: "spoqaB",
    color: `${theme.colors.deepPurple}`,
    fontSize: 16,
  },
});

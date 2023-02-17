import { StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const ProfileBox = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>{title}</Text>
      <Text style={[styles.text, { color: `${theme.colors.middleGray}` }]}>
        {content}
      </Text>
    </View>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    fontFamily: "spoqaM",
    fontSize: 16,
  },
});

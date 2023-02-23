import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const TopInformation = ({ name, intro, style, image }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <Image
        style={styles.profile}
        source={
          image ? { uri: image } : require("@assets/icons/defaultProfile.png")
        }
      />
      <Text style={[styles.text, styles.name]}>{name}</Text>
      <Text style={[styles.text, styles.intro]}>{intro}</Text>
    </View>
  );
};

export default TopInformation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  name: {
    fontFamily: "spoqaB",
    color: `${theme.colors.deepPurple}`,
  },
  intro: {
    fontFamily: "spoqaR",
  },
});

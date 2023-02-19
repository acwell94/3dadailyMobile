import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const SettingBox = ({ title, style, onPress }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
      }}
      onPress={onPress}
    >
      <Text style={[styles.title, { ...style }]}>{title}</Text>

      <Image
        style={styles.arrowImg}
        source={require("@assets/icons/downArrow.png")}
      />
    </Pressable>
  );
};

export default SettingBox;

const styles = StyleSheet.create({
  title: {
    fontFamily: "spoqaM",
    fontSize: 16,
  },
  arrowImg: {
    width: 18,
    height: 18,
    transform: [{ rotate: "-90deg" }],
  },
});

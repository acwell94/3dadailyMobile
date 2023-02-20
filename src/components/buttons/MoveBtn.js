import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const MoveBtn = ({ btnTitle, isLight, style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: isLight
            ? `${theme.colors.mainPurple}`
            : `${theme.colors.deepPurple}`,
          opacity: pressed ? 0.8 : 1,
          marginRight: isLight ? 16 : 0,
        },
        { ...style },
      ]}
    >
      <Text style={styles.title}>{btnTitle}</Text>
    </Pressable>
  );
};
export default MoveBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontFamily: "spoqaR",
    fontSize: 16,
    color: `${theme.colors.white}`,
  },
});

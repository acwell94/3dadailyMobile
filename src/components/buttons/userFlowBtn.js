import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../utils/theme";

const UserFlowBtn = ({ btnStyle, text, isComplete, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnBox,
        { ...btnStyle },
        {
          backgroundColor: isComplete
            ? `${theme.colors.deepPurple}`
            : `${theme.colors.lightPurple}`,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      disabled={!isComplete}
    >
      <Text style={[styles.text]}>{text}</Text>
    </Pressable>
  );
};

export default UserFlowBtn;

const styles = StyleSheet.create({
  btnBox: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  text: {
    fontFamily: "spoqaB",
    fontSize: 16,
    color: `${theme.colors.white}`,
  },
});

import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../utils/theme";

const FriendListButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btnContainer,
        title === "삭제"
          ? {
              backgroundColor: `${theme.colors.gray}`,
            }
          : {
              backgroundColor: `${theme.colors.deepPurple}`,
            },
      ]}
    >
      <Text
        style={[
          styles.btnText,
          title === "삭제"
            ? { color: `${theme.colors.darkGray}` }
            : { color: "white" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default FriendListButton;

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  btnText: {
    fontFamily: "spoqaM",
    fontSize: 12,
  },
});

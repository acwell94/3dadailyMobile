import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import theme from "../../utils/theme";

const RoundBtn = ({ onPress, text, btnStyle, txtStyle, isLoading }) => {
  return (
    <Pressable style={[styles.btnBox, { ...btnStyle }]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={`${theme.colors.ashBlue}`} />
      ) : (
        <Text style={[styles.btnText, { ...txtStyle }]}>{text || "확인"}</Text>
      )}
    </Pressable>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  btnBox: {
    width: "100%",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 20,
    elevation: 4,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "spoqaB",
  },
});

import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../utils/theme";

const SelectBtn = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default SelectBtn;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: `${theme.colors.deepPurple}`,
  },
  title: {
    fontFamily: "spoqaR",
    fontSize: 16,
    color: "white",
  },
});

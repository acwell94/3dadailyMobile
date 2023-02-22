import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import theme from "../../utils/theme";

const WriteTitleInput = ({ placeholder }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={`${theme.colors.inputBorder}`}
      cursorColor={`${theme.colors.mainPurple}`}
      maxLength={20}
    />
  );
};

export default forwardRef(WriteTitleInput);

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.inputBorderLight}`,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: `${theme.colors.sliverGray}`,
    fontFamily: "spoqaR",
    fontSize: 16,
  },
});

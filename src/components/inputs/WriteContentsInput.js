import { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../utils/theme";

const WriteContentsInput = ({ placeholder, onChange, value }, ref) => {
  return (
    <View>
      <TextInput
        onChange={onChange}
        ref={ref}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={`${theme.colors.inputBorder}`}
        cursorColor={`${theme.colors.mainPurple}`}
        maxLength={30}
        multiline={true}
        defaultValue={value ? value : null}
      />
      <Text>{value.length}/30</Text>
    </View>
  );
};

export default forwardRef(WriteContentsInput);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: `${theme.colors.inputBorderLight}`,
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 4,
    textAlignVertical: "top",
    color: `${theme.colors.blackGray}`,
    fontFamily: "spoqaR",
    fontSize: 16,
  },
});

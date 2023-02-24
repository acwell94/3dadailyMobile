import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import theme from "../../utils/theme";

const EditInputBox = ({
  title,
  secureTextEntry,
  defaultData,
  style,
  onChange,
  error,
  errorText,
}) => {
  return (
    <Pressable style={{ ...style }} onPress={Keyboard.dismiss}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={[styles.input]}
        placeholderTextColor={`${theme.colors.inputBorder}`}
        cursorColor={`${theme.colors.mainPurple}`}
        placeholder={defaultData}
        onChange={onChange}
      />

      <Text style={[styles.errorText, { opacity: error ? 1 : 0 }]}>
        {errorText}
      </Text>
    </Pressable>
  );
};

export default EditInputBox;

const styles = StyleSheet.create({
  title: {
    fontFamily: "spoqaB",
    fontSize: 16,
    color: `${theme.colors.middleGray}`,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: `${theme.colors.inputBorder}`,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "spoqaM",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 10,
    color: `${theme.colors.red}`,
    fontFamily: "spoqaM",
  },
});

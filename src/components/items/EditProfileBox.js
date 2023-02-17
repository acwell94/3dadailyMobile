import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import theme from "../../utils/theme";

const EditProfileBox = ({ title, defaultData }) => {
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={`${theme.colors.inputBorder}`}
        placeholder={defaultData}
      />
    </Pressable>
  );
};

export default EditProfileBox;

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
  },
});

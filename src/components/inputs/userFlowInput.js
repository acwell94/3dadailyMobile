import { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../utils/theme";

const UserFlowInput = (
  {
    placeholder,
    keyboardType,
    secureTextEntry,
    onSubmitEditing,
    onChange,
    error,
    errorText,
    style,
    inputStyle,
  },
  ref
) => {
  return (
    <View style={[{ ...style }]}>
      <TextInput
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor={`${theme.colors.inputBorder}`}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        onChange={onChange}
        autoCapitalize={"none"}
        style={[styles.input, { ...inputStyle }]}
      />
      <Text style={[styles.text, { opacity: error ? 1 : 0 }]}>{errorText}</Text>
    </View>
  );
};

export default forwardRef(UserFlowInput);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    marginBottom: 8,
    borderBottomColor: `${theme.colors.inputBorder}`,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: "spoqaM",
  },
  text: {
    fontSize: 10,
    color: `${theme.colors.red}`,
    fontFamily: "spoqaM",
  },
});

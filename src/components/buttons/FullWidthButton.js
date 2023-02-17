import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const FullWidthButton = ({ buttonTitle }) => {
  return (
    <View style={styles.buttonLimit}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? `${theme.colors.mainPurple}`
              : `${theme.colors.deepPurple}`,
          },
        ]}
      >
        <Text style={styles.buttonTitle}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
};

export default FullWidthButton;

const styles = StyleSheet.create({
  buttonLimit: {
    width: "100%",
    bottom: 36,
    paddingHorizontal: 24,
    position: "absolute",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 4,
  },
  buttonTitle: {
    fontFamily: "spoqaB",
    fontSize: 16,
    color: `${theme.colors.white}`,
  },
});

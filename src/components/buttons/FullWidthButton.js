import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../../utils/theme";

const FullWidthButton = ({ buttonTitle, onPress, isLoading, isDisabled }) => {
  return (
    <View style={styles.buttonLimit}>
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? `${theme.colors.mainPurple}`
              : `${theme.colors.deepPurple}`,
            backgroundColor: isDisabled
              ? `${theme.colors.mainPurple}`
              : `${theme.colors.deepPurple}`,
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={`${theme.colors.ashBlue}`} />
        ) : (
          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        )}
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
    borderRadius: 8,
    elevation: 4,
    minHeight: 50,
  },
  buttonTitle: {
    fontFamily: "spoqaB",
    fontSize: 16,
    color: `${theme.colors.white}`,
  },
});

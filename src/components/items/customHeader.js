import { StyleSheet, Text, View } from "react-native";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: "spoqaB",
  },
});

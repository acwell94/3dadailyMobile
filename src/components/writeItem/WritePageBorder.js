import { StyleSheet, Text, View } from "react-native";

const WritePageBorder = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default WritePageBorder;

const styles = StyleSheet.create({
  container: {
    width: "98%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: "#6164BB",
    backgroundColor: "white",
    borderRadius: 10,
  },
});

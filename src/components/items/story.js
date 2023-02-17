import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";
import useNav from "../hooks/useNav";

const Story = () => {
  return (
    <Pressable style={styles.container} onPress={useNav("Detail")}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.storyImage}
          source={require("@assets/testImage/testImg.png")}
        />
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.month}>JAN</Text>
        <Text style={styles.date}>18</Text>
        <Text style={styles.day}>WED</Text>
      </View>
    </Pressable>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    width: "98%",
    height: 333,
    marginBottom: 32,
    alignSelf: "center",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateBox: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  month: {
    fontFamily: "spoqaR",
    fontSize: 16,
    color: `${theme.colors.sliverGray}`,
  },
  date: {
    fontFamily: "spoqaB",
    fontSize: 40,
    marginHorizontal: 30,
  },
  day: {
    fontFamily: "spoqaR",
    fontSize: 16,
  },
});

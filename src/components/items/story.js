import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";
import useDateForm from "../hooks/useDateForm";
import useNav from "../hooks/useNav";

const Story = ({ data }) => {
  const { month, date, day } = useDateForm(data.item.date);
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("Detail", { cid: data.item.id });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.storyImage}
          source={
            data.item.image
              ? { uri: data.item.image }
              : require("@assets/noneDetailImg.png")
          }
        />
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
    </Pressable>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 4,
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
    resizeMode: "contain",
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

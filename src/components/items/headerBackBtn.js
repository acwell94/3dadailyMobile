import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const HeaderBackBtn = ({ title, rightText }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable style={styles.leftBackBtn} onPress={() => navigation.goBack()}>
        <Image
          style={{ width: 9, height: 16 }}
          source={require("@assets/icons/backBtn.png")}
        />
      </Pressable>
      {title && <Text style={styles.title}>{title}</Text>}
      {rightText ? (
        <Pressable style={styles.rightBtn}>
          <Text style={styles.rightText}>{rightText}</Text>
        </Pressable>
      ) : (
        <View style={{ width: 50, height: "100%" }}></View>
      )}
    </View>
  );
};
export default HeaderBackBtn;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftBackBtn: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    paddingLeft: 24,
  },
  title: {
    height: "100%",
    fontFamily: "spoqaM",
    color: `${theme.colors.middleGray}`,
    fontSize: 16,
    textAlignVertical: "center",
  },

  rightBtn: {
    minWidth: 50,
    // height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 24,
  },
  rightText: {
    height: "100%",
    fontFamily: "spoqaM",
    color: `${theme.colors.sliverGray}`,
    fontSize: 16,
    textAlignVertical: "center",
  },
});

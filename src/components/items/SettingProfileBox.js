import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const SettingProfileBox = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.profileImg}
          source={require("@assets/testImage/testImg.png")}
        />
        <View>
          <Text style={styles.name}>김민영</Text>
          <Text style={styles.editInfo}>내 정보 수정하기</Text>
        </View>
      </View>
      <Image
        style={styles.arrowImg}
        source={require("@assets/icons/downArrow.png")}
      />
    </View>
  );
};

export default SettingProfileBox;

const styles = StyleSheet.create({
  profileImg: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontFamily: "spoqaB",
    fontSize: 16,
  },
  editInfo: {
    fontFamily: "spoqaR",
    fontSize: 14,
    color: `${theme.colors.sliverGray}`,
  },
  arrowImg: {
    width: 18,
    height: 18,
    transform: [{ rotate: "-90deg" }],
  },
});

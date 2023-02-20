import { memo } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../../utils/theme";
import MoveBtn from "../buttons/MoveBtn";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";
const { width } = Dimensions.get("window");
const PickStatusImage = ({
  name,
  intro,
  data,
  title,
  prevBtnHandler,
  nextBtnHandler,
}) => {
  return (
    <View style={styles.container}>
      <TopInformation name={name} intro={intro} style={{ marginBottom: 16 }} />
      <WritePageBorder>
        <View
          style={{
            width: "100%",
            height: "80%",
            paddingTop: 36,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{
              height: 100,
            }}
          >
            <View style={styles.statusImgContainer}>
              {data.map((el) => (
                <View key={el.id} style={styles.statusImgBox}>
                  <Image style={styles.statusImg} source={el.img} />
                  <Text style={styles.statusImgText}>{el.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonBox}>
          {prevBtnHandler && (
            <MoveBtn btnTitle="이전" onPress={prevBtnHandler} isLight={true} />
          )}
          {nextBtnHandler && (
            <MoveBtn btnTitle="다음" onPress={nextBtnHandler} />
          )}
        </View>
      </WritePageBorder>
    </View>
  );
};

export default memo(PickStatusImage);

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
    paddingBottom: 56,
    paddingHorizontal: 24,
  },
  buttonBox: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statusImgContainer: {
    flexDirection: "row",

    alignItems: "center",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
  },
  statusImgBox: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "33.3%",
  },
  statusImg: {
    width: 70,
    height: 70,
    marginBottom: 16,
  },
  statusImgText: {
    color: `${theme.colors.mainPurple}`,
    fontSize: 16,
    fontFamily: "spoqaB",
  },
});

import { memo } from "react";
import {
  Dimensions,
  Image,
  Pressable,
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
const { height } = Dimensions.get("window");
const PickStatusImage = ({
  name,
  intro,
  data,
  currentData,
  prevBtnHandler,
  nextBtnHandler,
  pickHandler,
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
            paddingHorizontal: 12,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.statusImgContainer}>
              {data.map((el) => (
                <Pressable
                  key={el.id}
                  style={[
                    styles.statusImgBox,
                    currentData === String(el.id) ? { elevation: 4 } : null,
                  ]}
                  onPress={() => pickHandler(el.category, String(el.id))}
                >
                  <Image style={styles.statusImg} source={el.img} />
                  <Text style={styles.statusImgText}>{el.title}</Text>
                </Pressable>
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
    height: height - 280,
    alignItems: "center",
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
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
  },
  statusImgBox: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    shadowColor: `${theme.colors.deepPurple}`,
    backgroundColor: "white",
    marginHorizontal: "5%",
    paddingVertical: 10,
    borderRadius: 200,
  },
  statusImg: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  statusImgText: {
    color: `${theme.colors.mainPurple}`,
    fontSize: 16,
    fontFamily: "spoqaB",
  },
});

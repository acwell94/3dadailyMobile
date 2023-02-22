import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import MoveBtn from "../buttons/MoveBtn";
import WriteContentsInput from "../inputs/WriteContentsInput";
import WriteTitleInput from "../inputs/WriteTitleInput";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickDaily = ({
  name,
  intro,

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
            paddingTop: 32,
            paddingHorizontal: 24,
          }}
        >
          <WriteTitleInput placeholder=" 20자 이내로 제목을 입력해 주세요." />
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
            <ScrollView style={{ height: "100%" }}>
              <WriteContentsInput placeholder=" 첫 번 째 줄을 입력해 주세요." />
              <WriteContentsInput placeholder=" 두 번 째 줄을 입력해 주세요." />
              <WriteContentsInput placeholder=" 세 번 째 줄을 입력해 주세요." />
            </ScrollView>
          </KeyboardAvoidingView>
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

export default PickDaily;

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
});

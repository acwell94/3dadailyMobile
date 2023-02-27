import { Dimensions, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import MoveBtn from "../buttons/MoveBtn";
import WriteContentsInput from "../inputs/WriteContentsInput";
import WriteTitleInput from "../inputs/WriteTitleInput";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickDaily = ({
  name,
  profile,
  intro,
  prevBtnHandler,
  nextBtnHandler,
  nextBtnTitle,
  writeDailyHandler,
  wroteTitle,
  wroteFirst,
  wroteSecond,
  wroteThird,
}) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TopInformation
          name={name}
          intro={intro}
          style={{ marginBottom: 16 }}
          image={profile}
        />
        <WritePageBorder>
          <View
            style={{
              flex: 1,
              paddingTop: 32,
              paddingHorizontal: 24,
              width: "100%",
            }}
          >
            <View>
              <WriteTitleInput
                placeholder=" 20자 이내로 제목을 입력해 주세요."
                onChange={(e) => writeDailyHandler(e, "title")}
                value={wroteTitle}
              />

              <WriteContentsInput
                placeholder=" 첫 번 째 줄을 입력해 주세요."
                onChange={(e) => writeDailyHandler(e, "firstContents")}
                value={wroteFirst}
              />
              <WriteContentsInput
                placeholder=" 두 번 째 줄을 입력해 주세요."
                onChange={(e) => writeDailyHandler(e, "secondContents")}
                value={wroteSecond}
              />
              <WriteContentsInput
                placeholder=" 세 번 째 줄을 입력해 주세요."
                onChange={(e) => writeDailyHandler(e, "thirdContents")}
                value={wroteThird}
              />
            </View>
          </View>
          <View style={styles.buttonBox}>
            {prevBtnHandler && (
              <MoveBtn
                btnTitle="이전"
                onPress={prevBtnHandler}
                isLight={true}
              />
            )}
            {nextBtnHandler && (
              <MoveBtn btnTitle={nextBtnTitle} onPress={nextBtnHandler} />
            )}
          </View>
        </WritePageBorder>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PickDaily;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 280,
    alignItems: "center",
    paddingHorizontal: 24,
    flex: 1,
    marginBottom: 20,
  },
  buttonBox: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

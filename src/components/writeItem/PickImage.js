import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MoveBtn from "../buttons/MoveBtn";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";

import { useEffect } from "react";

import theme from "../../utils/theme";
import useImageUpload from "../hooks/useImageUpload";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickImage = ({
  name,
  profile,
  intro,
  current,
  prevBtnHandler,
  nextBtnHandler,
  pickPictureHandler,
}) => {
  const { image, pickHandler } = useImageUpload();

  useEffect(() => {
    pickPictureHandler(image);
  }, [image]);

  return (
    <View style={styles.container}>
      <TopInformation
        name={name}
        intro={intro}
        style={{ marginBottom: 16 }}
        image={profile}
      />
      <WritePageBorder>
        <Pressable
          onPress={pickHandler}
          style={{
            width: "100%",
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          {image ? (
            <Image style={styles.uploadImg} source={{ uri: image }} />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Image
                style={current ? styles.uploadImg : styles.defaultImg}
                source={
                  current
                    ? { uri: current }
                    : require("@assets/icons/imagePick.png")
                }
              />
              <Text style={styles.infoMsg}>사진첩 권한을 설정해 주세요.</Text>
            </View>
          )}
        </Pressable>

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

export default PickImage;

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
  defaultImg: {
    width: 120,
    height: 120,
    left: 10,
    marginBottom: 16,
  },
  infoMsg: {
    fontFamily: "spoqaR",
    fontSize: 14,
    color: `${theme.colors.blackGray}`,
  },
  uploadImg: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
});

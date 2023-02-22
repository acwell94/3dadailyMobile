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
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { BACK_API } from "react-native-dotenv";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";
import theme from "../../utils/theme";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickImage = ({ name, intro, prevBtnHandler, nextBtnHandler }) => {
  const [image, setImage] = useState("");

  const imageUpload = async () => {
    const checkMediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (checkMediaLibraryPermission.status === "denied") {
      Alert.alert(
        "사진첩 권한을 허용해 주세요.",
        "권한을 허용하지 않으면 삼다일기를 이용할 수 없습니다.",
        [
          {
            text: "확인",
            style: "cancel",
          },
        ]
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.5,
        aspect: [1, 1],
      });
      if (result.canceled) {
        return null;
      }

      const file = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );

      setImage(file.uri);
    }
  };

  const uploadImageHandler = async () => {
    try {
      const newImageUri = "file:///" + image.split("file:/").join("");
      const token = await AsyncStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", "모바일 테스트");
      formData.append("firstContents", "모바일테스트 첫줄");
      formData.append("secondContents", "모바일테스트 두줄");
      formData.append("thirdContents", "모바일테스트 세줄");
      formData.append(
        "date",
        "Tue Feb 14 2023 13:28:03 GMT+0900 (한국 표준시)"
      );
      formData.append("weather", "1");
      formData.append(
        "address",
        "대한민국 경기도 고양시 일산서구 대화동 대화역 3번 출입구"
      );
      formData.append("withWhom", "1");
      formData.append("what", "1");
      formData.append("feeling", "1");
      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      await axios.post(`${BACK_API}contents`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TopInformation name={name} intro={intro} style={{ marginBottom: 16 }} />
      <WritePageBorder>
        <Pressable
          onPress={imageUpload}
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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.defaultImg}
                source={require("@assets/icons/imagePick.png")}
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

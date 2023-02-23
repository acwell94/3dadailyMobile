import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState("");
  const pickHandler = async () => {
    const checkMediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (checkMediaLibraryPermission.status === "denied") {
      Alert.alert(
        "사진첩 권한을 허용해 주세요.",
        "이미지 등록을 위해 사진첩 권한은 필수입니다.",
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

  return { image, pickHandler };
};

export default useImageUpload;

import { Alert, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import FullWidthButton from "../../components/buttons/FullWidthButton";
import EditInputBox from "../../components/items/EditInputBox";
import EditProfileImage from "../../components/items/EditProfileImage";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import { userState } from "../../components/store";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import mime from "mime";
import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import useImageUpload from "../../components/hooks/useImageUpload";
import ConfirmModal from "../../components/modal/ConfirmModal";
import AskModal from "../../components/modal/AskModal";

import { useNavigation } from "@react-navigation/native";
import useLogout from "../../components/hooks/useLogout";
const EditProfileScreen = () => {
  const { logout } = useLogout();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalTitle, setSuccessModalTitle] = useState({
    first: "",
    second: "",
  });
  const { image, pickHandler } = useImageUpload();

  const errorModalHandler = () => {
    setErrorModalVisible((prev) => !prev);
  };

  const successModalHandler = () => {
    setSuccessModalVisible((prev) => !prev);
  };

  const changeNameHandler = (e) => {
    const {
      nativeEvent: { text },
    } = e;
    setEditName(text);
  };
  const editProfile = async () => {
    setIsLoading((prev) => !prev);
    const token = await AsyncStorage.getItem("accessToken");
    try {
      const newImageUri = "file:///" + image.split("file:/").join("");
      const formData = new FormData();

      formData.append("name", editName ? editName : userInfo.name);
      formData.append("profileImg", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
      const response = await axios.patch(
        `${BACK_API}users/changeProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading((prev) => !prev);
      setSuccessModalTitle({
        first: "프로필이 변경되었습니다.",
        second: "프로필은 다시 로그인 후 적용 됩니다.",
      });
      setSuccessModalVisible((prev) => !prev);
    } catch (err) {
      console.log(err);
      setIsLoading((prev) => !prev);
      setErrorModalTitle("잠시후 다시 시도해주세요.");
      setErrorModalVisible((prev) => !prev);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <AskModal
        isVisible={successModalVisible}
        firstText={successModalTitle.first}
        warningText={successModalTitle.second}
        optionTitle="로그아웃"
        closeModalHandler={successModalHandler}
        optionHandler={logout}
      />
      <ConfirmModal
        isVisible={errorModalVisible}
        title={errorModalTitle}
        closeModalHandler={errorModalHandler}
      />
      <HeaderBackBtn title="프로필 수정" />
      <EditProfileImage
        profileImg={userInfo.profileImg}
        editImage={image}
        onPress={pickHandler}
        isEdit={true}
      />
      <View style={{ paddingHorizontal: 24 }}>
        <EditInputBox
          title="닉네임"
          defaultData={userInfo.name}
          onChange={(e) => changeNameHandler(e)}
        />
      </View>
      <FullWidthButton
        buttonTitle="수정하기"
        onPress={editProfile}
        isLoading={isLoading}
      />
    </View>
  );
};

export default EditProfileScreen;

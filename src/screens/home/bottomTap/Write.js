import { useCallback, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import PickDate from "../../../components/writeItem/PickDate";
import PickStatusImage from "../../../components/writeItem/PickStatusImage";
import { Feeling, Weather, What, WithWhom } from "../../../utils/contents";

import PickAddress from "../../../components/writeItem/PickAddress";
import PickImage from "../../../components/writeItem/PickImage";
import PickDaily from "../../../components/writeItem/PickDaily";
import useAuth from "../../../components/hooks/useAuth";

import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import mime from "mime";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "../../../components/modal/LoadingModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../../components/store";
import ConfirmModal from "../../../components/modal/ConfirmModal";
const { width } = Dimensions.get("window");
const Write = () => {
  useAuth();
  const userInfo = useRecoilValue(userState);

  const navigation = useNavigation();
  const [writeForm, setWriteForm] = useState({
    title: "",
    firstContents: "",
    secondContents: "",
    thirdContents: "",
    date: `${new Date()}`,
    weather: "",
    address: "",
    location: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    withWhom: "",
    what: "",
    feeling: "",
    image: "",
  });
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalText, setErrorModalText] = useState("");

  const writeScrollRef = useRef(null);

  const moveBtnHandler = (times) => {
    writeScrollRef.current.scrollTo({
      x: width * times,
      y: 0,
      animated: true,
    });
  };

  // 날짜

  const [showDatePicker, setShowDatePicker] = useState(false);

  const changeDateHandler = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || new Date(writeForm.date);
      setShowDatePicker((prev) => !prev);
      setWriteForm((prev) => ({ ...prev, date: String(currentDate) }));
    },
    [writeForm.date]
  );

  const datePickerHandler = useCallback(() => {
    setShowDatePicker((prev) => !prev);
  }, [changeDateHandler]);

  // 아이콘

  const changeStatusImageHandler = (name, id) => {
    setWriteForm((prev) => ({ ...prev, [name]: id }));
  };

  // 장소
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.5648406,
    lng: 126.977303,
  });
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const changeLocationHandler = useCallback(
    async (data, details = null) => {
      setWriteForm((prev) => ({ ...prev, address: data.description }));
      setCurrentLocation({
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      });
      setLocationModalVisible((prev) => !prev);
    },
    [writeForm.location]
  );
  const locationModalHandler = useCallback(() => {
    setLocationModalVisible((prev) => !prev);
  }, [changeLocationHandler]);

  // 사진 선택

  const changePictureHandler = useCallback((image) => {
    setWriteForm((prev) => ({ ...prev, image: image }));
  }, []);

  // 일기 작성

  const changeDailyHandler = useCallback(
    (e, name) => {
      const {
        nativeEvent: { text },
      } = e;
      if (text.length > 30) {
        text = text.substring(0, 30);
      } else {
        setWriteForm((prev) => ({ ...prev, [name]: text }));
      }
    },
    [
      writeForm.title,
      writeForm.firstContents,
      writeForm.secondContents,
      writeForm.thirdContents,
    ]
  );

  const createContentsHandler = async () => {
    if (!writeForm.weather) {
      moveBtnHandler(1);
      setErrorModalText(`오늘 날씨는 어땠나요?`);
      setErrorModalVisible((prev) => !prev);
      return;
    } else if (!writeForm.withWhom) {
      moveBtnHandler(3);

      setErrorModalText(`오늘 누구와 있었나요?`);
      setErrorModalVisible((prev) => !prev);
      return;
    } else if (!writeForm.what) {
      moveBtnHandler(4);
      setErrorModalText(`오늘 무엇을 하셨나요?`);
      setErrorModalVisible((prev) => !prev);
      return;
    } else if (!writeForm.feeling) {
      moveBtnHandler(5);
      setErrorModalText(`오늘 기분이 어땠나요?`);
      setErrorModalVisible((prev) => !prev);
      return;
    } else if (!writeForm.title) {
      moveBtnHandler(7);
      setErrorModalText(`제목을 작성해 주세요.`);
      setErrorModalVisible((prev) => !prev);
      return;
    }
    const token = await AsyncStorage.getItem("accessToken");
    setLoadingModalVisible((prev) => !prev);
    try {
      const newImageUri = writeForm.image
        ? "file:///" + writeForm.image.split("file:/").join("")
        : "";
      const formData = new FormData();

      formData.append("title", writeForm.title);
      formData.append("firstContents", writeForm.firstContents);
      formData.append("secondContents", writeForm.secondContents);
      formData.append("thirdContents", writeForm.thirdContents);
      formData.append("date", String(writeForm.date));
      formData.append("weather", writeForm.weather);
      formData.append("address", writeForm.address);
      formData.append("withWhom", writeForm.withWhom);
      formData.append("what", writeForm.what);
      formData.append("feeling", writeForm.feeling);
      formData.append(
        "image",
        newImageUri
          ? {
              uri: newImageUri,
              type: mime.getType(newImageUri),
              name: newImageUri.split("/").pop(),
            }
          : ""
      );
      await axios.post(`${BACK_API}contents`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoadingModalVisible((prev) => !prev);
      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ConfirmModal
        isVisible={errorModalVisible}
        title={errorModalText}
        closeModalHandler={() => setErrorModalVisible((prev) => !prev)}
      />
      <LoadingModal isVisible={loadingModalVisible} />
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={writeScrollRef}
          scrollEnabled={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <PickDate
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 날짜를 선택해 주세요."
            date={new Date(writeForm.date)}
            handleDateChange={changeDateHandler}
            datePickerHandler={datePickerHandler}
            showDatePicker={showDatePicker}
            nextBtnHandler={() => moveBtnHandler(1)}
          />
          <PickStatusImage
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘 날씨는 어땠나요?"
            data={Weather}
            currentData={writeForm.weather}
            prevBtnHandler={() => moveBtnHandler(0)}
            nextBtnHandler={() => moveBtnHandler(2)}
            pickHandler={changeStatusImageHandler}
          />

          <PickAddress
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘 어디에 있었나요?"
            prevBtnHandler={() => moveBtnHandler(1)}
            nextBtnHandler={() => moveBtnHandler(3)}
            locationHandler={changeLocationHandler}
            current={currentLocation}
            locationModalVisible={locationModalVisible}
            locationModalHandler={locationModalHandler}
          />

          <PickStatusImage
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘 누구와 있었나요?"
            data={WithWhom}
            currentData={writeForm.withWhom}
            prevBtnHandler={() => moveBtnHandler(2)}
            nextBtnHandler={() => moveBtnHandler(4)}
            pickHandler={changeStatusImageHandler}
          />
          <PickStatusImage
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘 무엇을 하셨나요?"
            data={What}
            currentData={writeForm.what}
            prevBtnHandler={() => moveBtnHandler(3)}
            nextBtnHandler={() => moveBtnHandler(5)}
            pickHandler={changeStatusImageHandler}
          />
          <PickStatusImage
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘 기분은 어땠나요?"
            data={Feeling}
            currentData={writeForm.feeling}
            prevBtnHandler={() => moveBtnHandler(4)}
            nextBtnHandler={() => moveBtnHandler(6)}
            pickHandler={changeStatusImageHandler}
          />
          <PickImage
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘을 기념할 사진이 있나요?"
            prevBtnHandler={() => moveBtnHandler(5)}
            nextBtnHandler={() => moveBtnHandler(7)}
            pickPictureHandler={changePictureHandler}
          />
          <PickDaily
            name={userInfo.name}
            profile={userInfo.profileImg}
            intro="님, 오늘의 추억을 남겨주세요."
            prevBtnHandler={() => moveBtnHandler(6)}
            nextBtnHandler={createContentsHandler}
            nextBtnTitle="작성"
            writeDailyHandler={changeDailyHandler}
            wroteTitle={writeForm.title}
            wroteFirst={writeForm.firstContents}
            wroteSecond={writeForm.secondContents}
            wroteThird={writeForm.thirdContents}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Write;

import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import PickDate from "../../../components/writeItem/PickDate";
import PickStatusImage from "../../../components/writeItem/PickStatusImage";
import { Feeling, Weather, What, WithWhom } from "../../../utils/contents";

import PickAddress from "../../../components/writeItem/PickAddress";
import PickImage from "../../../components/writeItem/PickImage";
import PickDaily from "../../../components/writeItem/PickDaily";
import useAuth from "../../../components/hooks/useAuth";
const { width } = Dimensions.get("window");
const Write = () => {
  useAuth();
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

  const writeScrollRef = useRef(null);

  const moveBtnHandler = (times) => {
    writeScrollRef.current.scrollTo({
      x: width * times,
      y: 0,
      animated: true,
    });
  };

  // 날짜

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const changeDateHandler = useCallback(
    (selectedDate) => {
      console.log(selectedDate, "selected");
      const currentDate = selectedDate || new Date(writeForm.date);
      console.log(currentDate, "current");
      setShowDatePicker((prev) => !prev);
      setWriteForm((prev) => ({ ...prev, date: String(currentDate) }));
    },
    [writeForm.date]
  );

  console.log(writeForm.date);

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   console.log(selectedDate, "selected");
  //   console.log(currentDate, "current");
  //   setShowDatePicker((prev) => !prev);
  //   setDate(currentDate);
  // };
  const datePickerHandler = () => {
    setShowDatePicker((prev) => !prev);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={writeScrollRef}
          scrollEnabled={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <PickDate
            date={new Date(writeForm.date)}
            handleDateChange={changeDateHandler}
            datePickerHandler={datePickerHandler}
            showDatePicker={showDatePicker}
            nextBtnHandler={() => moveBtnHandler(1)}
          />
          <PickStatusImage
            name="민영"
            intro="님, 오늘 날씨는 어땠나요?"
            data={Weather}
            prevBtnHandler={() => moveBtnHandler(0)}
            nextBtnHandler={() => moveBtnHandler(2)}
          />

          <PickAddress
            name="민영"
            intro="님, 오늘 어디에 있었나요?"
            prevBtnHandler={() => moveBtnHandler(1)}
            nextBtnHandler={() => moveBtnHandler(3)}
          />

          <PickStatusImage
            name="민영"
            intro="님, 오늘 누구와 있었나요?"
            data={WithWhom}
            prevBtnHandler={() => moveBtnHandler(2)}
            nextBtnHandler={() => moveBtnHandler(4)}
          />
          <PickStatusImage
            name="민영"
            intro="님, 오늘 무엇을 하셨나요?"
            data={What}
            prevBtnHandler={() => moveBtnHandler(3)}
            nextBtnHandler={() => moveBtnHandler(5)}
          />
          <PickStatusImage
            name="민영"
            intro="님, 오늘 기분은 어땠나요?"
            data={Feeling}
            prevBtnHandler={() => moveBtnHandler(4)}
            nextBtnHandler={() => moveBtnHandler(6)}
          />
          <PickImage
            name="민영"
            intro="님, 오늘을 기념할 사진이 있나요?"
            prevBtnHandler={() => moveBtnHandler(5)}
            nextBtnHandler={() => moveBtnHandler(7)}
          />
          <PickDaily
            name="민영"
            intro="님, 오늘의 추억을 남겨주세요."
            prevBtnHandler={() => moveBtnHandler(6)}
            nextBtnHandler={"1"}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Write;

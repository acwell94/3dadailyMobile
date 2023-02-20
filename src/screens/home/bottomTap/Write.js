import { useRef, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import PickDate from "../../../components/writeItem/PickDate";
import PickStatusImage from "../../../components/writeItem/PickStatusImage";
import { Weather } from "../../../utils/contents";
const { width } = Dimensions.get("window");
const Write = () => {
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
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker((prev) => !prev);
    setDate(currentDate);
  };
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
            date={date}
            handleDateChange={handleDateChange}
            datePickerHandler={datePickerHandler}
            showDatePicker={showDatePicker}
            nextBtnHandler={() => moveBtnHandler(1)}
          />
          <PickStatusImage
            title="2번"
            name="민영"
            intro="님, 오늘 날씨는 어땠나요?"
            data={Weather}
            prevBtnHandler={() => moveBtnHandler(0)}
            nextBtnHandler={() => moveBtnHandler(2)}
          />
          {/* <PickStatusImage
            title="3번"
            prevBtnHandler={() => moveBtnHandler(1)}
            nextBtnHandler={() => moveBtnHandler(3)}
          />
          <PickStatusImage
            title="4번"
            prevBtnHandler={() => moveBtnHandler(2)}
            nextBtnHandler={() => moveBtnHandler(4)}
          />
          <PickStatusImage
            title="5번"
            prevBtnHandler={() => moveBtnHandler(3)}
            nextBtnHandler={() => moveBtnHandler(5)}
          />
          <PickStatusImage
            title="6번"
            prevBtnHandler={() => moveBtnHandler(4)}
            nextBtnHandler={() => moveBtnHandler(6)}
          />
          <PickStatusImage
            title="7번"
            prevBtnHandler={() => moveBtnHandler(5)}
            nextBtnHandler={() => moveBtnHandler(7)}
          />
          <PickStatusImage
            title="8번"
            prevBtnHandler={() => moveBtnHandler(6)}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default Write;

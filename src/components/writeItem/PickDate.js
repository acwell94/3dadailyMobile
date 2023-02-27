import { Dimensions, StyleSheet, Text, View } from "react-native";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";
import DateTimePicker from "@react-native-community/datetimepicker";
import useDisplayDate from "../hooks/useDisplayDate";
import SelectBtn from "../buttons/SelectBtn";
import MoveBtn from "../buttons/MoveBtn";
import { memo } from "react";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickDate = ({
  date,
  handleDateChange,
  datePickerHandler,
  showDatePicker,
  nextBtnHandler,
  name,
  intro,
  profile,
}) => {
  return (
    <View style={styles.container}>
      <TopInformation
        name={name}
        intro={intro}
        style={{ marginBottom: 16 }}
        image={profile}
      />
      <WritePageBorder>
        <View style={styles.selectedDateBox}>
          <Text style={styles.selectedDateText}>{useDisplayDate(date)}</Text>
          <SelectBtn title="날짜 선택하기" onPress={datePickerHandler} />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.buttonBox}>
          <MoveBtn btnTitle="다음" onPress={nextBtnHandler} />
        </View>
      </WritePageBorder>
    </View>
  );
};

export default memo(PickDate);

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 280,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  selectedDateBox: {
    justifyContent: "center",
    height: "80%",
  },
  selectedDateText: {
    fontFamily: "spoqaM",
    fontSize: 16,
    marginBottom: 36,
  },
  buttonBox: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});

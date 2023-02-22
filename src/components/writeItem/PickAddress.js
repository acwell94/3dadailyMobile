import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";

import { useState } from "react";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import MoveBtn from "../buttons/MoveBtn";
import theme from "../../utils/theme";
import LocationModal from "../modal/LocationModal";
import SelectBtn from "../buttons/SelectBtn";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickAddress = ({ name, intro, prevBtnHandler, nextBtnHandler }) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const [where, setWhere] = useState({
    placeName: "서울시청",
    address: "서울특별시 시청앞",
    lat: 37.5648406,
    lng: 126.977303,
  });

  const locationModalHandler = () => {
    setLocationModalVisible((prev) => !prev);
  };

  const autoCompleteResultHandler = async (data, details = null) => {
    setWhere({
      placeName: details.name,
      address: data.description,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
    });
    setLocationModalVisible((prev) => !prev);
  };
  console.log(where, "2번");
  return (
    <View style={styles.container}>
      <LocationModal
        isVisible={locationModalVisible}
        modalHandler={locationModalHandler}
        autoCompleteHandler={autoCompleteResultHandler}
      />
      <TopInformation name={name} intro={intro} style={{ marginBottom: 16 }} />

      <WritePageBorder>
        <View
          style={{
            width: "100%",
            height: "80%",
            paddingTop: 24,
            paddingHorizontal: 26,
          }}
        >
          <SelectBtn
            title="장소를 선택해 주세요."
            onPress={locationModalHandler}
          />

          <MapView
            style={styles.map}
            region={{
              latitude: where.lat,
              longitude: where.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: where.lat,
                longitude: where.lng,
              }}
              pinColor={`${theme.colors.mainPurple}`}
              title={where.placeName}
            />
          </MapView>
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

export default PickAddress;

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
  map: {
    width: "100%",
    height: "80%",
    marginTop: 14,
  },
});

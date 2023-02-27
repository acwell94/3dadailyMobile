import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import TopInformation from "../items/TopInformation";
import WritePageBorder from "./WritePageBorder";

import { useState } from "react";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import MoveBtn from "../buttons/MoveBtn";
import LocationModal from "../modal/LocationModal";
import SelectBtn from "../buttons/SelectBtn";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const PickAddress = ({
  name,
  profile,
  intro,
  prevBtnHandler,
  nextBtnHandler,
  locationHandler,
  current,
  locationModalVisible,
  locationModalHandler,
}) => {
  return (
    <View style={styles.container}>
      <LocationModal
        isVisible={locationModalVisible}
        modalHandler={locationModalHandler}
        autoCompleteHandler={locationHandler}
      />
      <TopInformation
        name={name}
        intro={intro}
        style={{ marginBottom: 16 }}
        image={profile}
      />

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
              latitude: current.lat,
              longitude: current.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: current.lat,
                longitude: current.lng,
              }}
              pinColor={"red"}
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

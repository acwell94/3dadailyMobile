import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import FilterBox from "../../../components/items/FilterBox";
import Story from "../../../components/items/Story";
import TopInformation from "../../../components/items/TopInformation";

const DUMMY = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TopInformation
        name="민영"
        intro="님, 오늘 하루는 어땠나요?"
        style={{ marginBottom: 16 }}
      />
      <FilterBox name="민영입니당해" />
      <FlatList
        style={{ width: "100%" }}
        data={DUMMY}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(data) => {
          return <Story />;
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

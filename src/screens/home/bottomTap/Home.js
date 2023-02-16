import { Image, StyleSheet, Text, View } from "react-native";
import TopInformation from "../../../components/items/topInfomation";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>
      <TopInformation name="민영" intro=", 님 오늘 하루는 어땠나요?" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

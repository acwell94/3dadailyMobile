import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FilterBox from "../../../components/items/FilterBox";
import Story from "../../../components/items/Story";
import TopInformation from "../../../components/items/TopInformation";
import { BACK_API } from "react-native-dotenv";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../../components/hooks/useAuth";
import theme from "../../../utils/theme";
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
  useAuth();
  const [story, setStory] = useState();
  const [prevSelect, setPrevSelect] = useState({
    category: "",
    sort: "",
  });

  const getSortedContents = async (category, sort) => {
    const userData = JSON.parse(await AsyncStorage.getItem("data"));

    if (prevSelect.category === category && prevSelect.sort === sort) {
      try {
        const { data } = await axios.get(
          `${BACK_API}contents/${userData.userId}`
        );
        setPrevSelect({ category: "", sort: "" });
        setStory(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await axios.get(
          `${BACK_API}contents/${userData.userId}?category=${category}&sort=${sort}`
        );
        setPrevSelect({
          category,
          sort,
        });
        setStory(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getContents = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("data"));
    const token = JSON.parse(await AsyncStorage.getItem("accessToken"));
    try {
      const { data } = await axios.get(
        `${BACK_API}contents/${userData.userId}`
      );
      setStory(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContents();
  }, []);
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
        name={story?.user.name}
        intro="님, 오늘 하루는 어땠나요?"
        style={{ marginBottom: 16 }}
        image={story?.user.profileImg}
      />
      <FilterBox
        name={story?.user.name}
        count={story?.story ? story?.story.length : 0}
        getSortedContents={getSortedContents}
        selected={prevSelect}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            enabled
            colors={[`${theme.colors.white}`]}
            progressBackgroundColor={`${theme.colors.deepPurple}`}
            onRefresh={() => {
              getContents();
            }}
            progressViewOffset={30}
          />
        }
        style={{ width: "100%" }}
        data={story?.story}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(data) => {
          return <Story data={data} />;
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

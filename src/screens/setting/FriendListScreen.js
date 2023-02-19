import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import FriendProfile from "../../components/items/FriendProfile";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import theme from "../../utils/theme";

const FriendListScreen = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <HeaderBackBtn title="친구 관리" />
      <View
        style={{
          paddingHorizontal: 24,
          marginTop: 24,
          position: "relative",
        }}
      >
        <Image
          style={styles.searchIcon}
          source={require("@assets/icons/search.png")}
        />
        <TextInput style={styles.searchInput} placeholder=" 친구 검색" />
      </View>
      <View style={{ height: "50%" }}>
        <ScrollView
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 24,
            marginTop: 24,
          }}
        >
          <FriendProfile name="김민영입니당해" btnTitle="삭제" />
          <FriendProfile name="김민영입니당해" btnTitle="본인" />
          <FriendProfile name="김민영입니당해" btnTitle="추가" />
        </ScrollView>
      </View>
    </View>
  );
};

export default FriendListScreen;

const styles = StyleSheet.create({
  searchIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: "50%",
    left: 18,
    zIndex: 2,
    transform: [{ translateX: 12 }, { translateY: -12 }],
  },
  searchInput: {
    paddingVertical: 9,
    paddingHorizontal: 40,
    borderRadius: 8,
    backgroundColor: `${theme.colors.gray}`,
    fontSize: 16,
    fontFamily: "spoqaR",
    color: "#6c6c6e",
  },
});

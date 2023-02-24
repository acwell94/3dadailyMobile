import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FriendProfile from "../../components/items/FriendProfile";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import theme from "../../utils/theme";
import { BACK_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useDebounce from "../../components/hooks/useDebounce";
import ConfirmModal from "../../components/modal/ConfirmModal";
import useAuth from "../../components/hooks/useAuth";
const FriendListScreen = ({ route }) => {
  useAuth();
  const { email, name, profileImg, userId } = route.params.userInfo;
  const [friendData, setFiendData] = useState();
  const [search, setSearch] = useState("");
  const [deleteFriendModalVisible, setDeleteFriendModalVisible] =
    useState(false);
  const [createFriendModalVisible, setCreateFriendModalVisible] =
    useState(false);
  const [createFriendModalText, setCreateFriendModalText] = useState("");

  const deleteModalHandler = useCallback(() => {
    setDeleteFriendModalVisible((prev) => !prev);
  }, [deleteFriendModalVisible]);

  const createModalHandler = useCallback(() => {
    setCreateFriendModalVisible((prev) => !prev);
  }, [createFriendModalVisible]);

  const createFriendHandler = async (email, id) => {
    const token = await AsyncStorage.getItem("accessToken");
    try {
      await axios.post(
        `${BACK_API}users/createPair`,
        {
          pairEmail: email,
          pairId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setCreateFriendModalText("친구가 추가되었습니다.");
      setCreateFriendModalVisible((prev) => !prev);
      setSearch("");
    } catch (err) {
      console.log(err.response.data.message);
      setCreateFriendModalText(err.response.data.message);
      setCreateFriendModalVisible((prev) => !prev);
    }
  };

  const deleteFriendHandler = async (id) => {
    const token = await AsyncStorage.getItem("accessToken");
    try {
      await axios.post(
        `${BACK_API}users/deletePair`,
        {
          pairId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setDeleteFriendModalVisible((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const getFriendList = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(`${BACK_API}users/getPair`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setFiendData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findData = useDebounce(search, 1000, `${BACK_API}users/findUser/`);

  const searchInputHandler = (e) => {
    const {
      nativeEvent: { text },
    } = e;
    setSearch(text);
  };

  useEffect(() => {
    getFriendList();
  }, [deleteModalHandler, createModalHandler]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ConfirmModal
        isVisible={deleteFriendModalVisible}
        title="친구가 삭제되었습니다."
        closeModalHandler={deleteModalHandler}
      />
      <ConfirmModal
        isVisible={createFriendModalVisible}
        title={createFriendModalText}
        closeModalHandler={createModalHandler}
      />
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
        <TextInput
          style={styles.searchInput}
          cursorColor={`${theme.colors.mainPurple}`}
          placeholder=" 친구의 아이디를 검색해 주세요."
          onChange={(e) => searchInputHandler(e)}
          value={search ? search : null}
        />
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
          {!search && (
            <>
              {friendData?.length ? (
                <>
                  {friendData?.map((el) => (
                    <FriendProfile
                      key={el._id}
                      name={el.name}
                      profileImg={el.profileImg}
                      btnTitle="삭제"
                      onPress={() => deleteFriendHandler(el._id)}
                    />
                  ))}
                </>
              ) : (
                <Text>없습니다.</Text>
              )}
            </>
          )}
          {search && (
            <>
              {findData ? (
                <FriendProfile
                  name={findData.foundUser.name}
                  btnTitle={findData.foundUser._id === userId ? "본인" : "추가"}
                  profileImg={findData.foundUser.profileImg}
                  onPress={
                    findData.foundUser._id === userId
                      ? null
                      : () =>
                          createFriendHandler(
                            findData.foundUser.email,
                            findData.foundUser._id
                          )
                  }
                />
              ) : (
                <Text>없습니다.</Text>
              )}
            </>
          )}
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

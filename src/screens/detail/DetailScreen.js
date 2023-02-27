import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../../utils/theme";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import AskModal from "../../components/modal/AskModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACK_API } from "react-native-dotenv";
import axios from "axios";
import useDateForm from "../../components/hooks/useDateForm";
import useDetailIcon from "../../components/hooks/useDetailIcon";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const DetailScreen = ({ route }) => {
  const { cid } = route.params;
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [detail, setDetail] = useState();
  const editBottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["18%"], []);
  const editModalHandler = useCallback(() => {
    editBottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const onPressDelete = useCallback(() => {
    editBottomSheetRef.current?.dismiss();
    setDeleteModalVisible((prev) => !prev);
  }, [detail]);

  const deleteContentsModalHandler = useCallback(() => {
    setDeleteModalVisible((prev) => !prev);
  }, [detail]);

  const getDetail = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    try {
      const { data } = await axios.get(`${BACK_API}contents/detail/${cid}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setDetail(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const deleteContentsHandler = useCallback(async () => {
    const token = await AsyncStorage.getItem("accessToken");
    try {
      await axios.delete(`${BACK_API}contents/${cid}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setDeleteModalVisible((prev) => !prev);
      navigation.reset({ routes: [{ name: "Home" }] });
    } catch (err) {
      console.log(err);
    }
  }, [detail]);

  const editContentsHandler = useCallback(() => {
    editBottomSheetRef.current?.close();
    navigation.navigate("EditContents", { data: detail });
  }, [detail]);

  const { year, month, date, day } = useDateForm(detail?.foundData.date || "");
  const { feelImg, weatherImg, whoImg, whatImg } = useDetailIcon(
    detail?.foundData.feeling,
    detail?.foundData.weather,
    detail?.foundData.withWhom,
    detail?.foundData.what
  );
  return (
    <BottomSheetModalProvider>
      <AskModal
        isVisible={deleteModalVisible}
        closeModalHandler={deleteContentsModalHandler}
        firstText="일기를"
        secondText="삭제하시겠습니까?"
        optionTitle="삭제"
        optionHandler={deleteContentsHandler}
      />
      <BottomSheetModal
        ref={editBottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Pressable style={styles.editBottomTabBox}>
            <Image
              style={styles.editBottomTabIcon}
              source={require("@assets/icons/bottomTab/bottomWriteIcon.png")}
            />
            <Text
              style={styles.editBottomTabText}
              onPress={editContentsHandler}
            >
              수정하기
            </Text>
          </Pressable>
          <Pressable style={styles.editBottomTabBox} onPress={onPressDelete}>
            <Image
              style={styles.editBottomTabIcon}
              source={require("@assets/icons/trash.png")}
            />
            <Text
              style={[
                styles.editBottomTabText,
                { color: `${theme.colors.red}` },
              ]}
            >
              삭제하기
            </Text>
          </Pressable>
        </View>
      </BottomSheetModal>
      <ScrollView style={{ flex: 1 }}>
        <HeaderBackBtn />
        <View style={styles.dailyWhoBox}>
          <View style={styles.who}>
            <Text style={styles.name}>{detail?.user.name}</Text>
            <Text style={styles.nameText}>님의 하루</Text>
          </View>
          <Pressable
            style={{
              height: 40,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={editModalHandler}
          >
            <View style={{ width: 3, height: 12 }}>
              <Image
                style={styles.dotImage}
                source={require("@assets/icons/dot.png")}
              />
            </View>
          </Pressable>
        </View>

        <Image
          style={styles.storyImage}
          source={{ uri: detail?.foundData.image }}
        />
        <View style={styles.storyContentsBox}>
          <Text style={styles.storyContentsTitle}>
            {detail?.foundData.title}
          </Text>
          <Text
            style={styles.stroyContentsDate}
          >{`${day} ${month} ${date} / ${year}`}</Text>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <Image style={styles.storyContentsImage} source={feelImg?.img} />
            <Image style={styles.storyContentsImage} source={weatherImg?.img} />
            <Image style={styles.storyContentsImage} source={whoImg?.img} />
            <Image style={styles.storyContentsImage} source={whatImg?.img} />
          </View>
          <View style={{ marginBottom: 16 }}>
            <View style={styles.storyContentsTextSplit}>
              {detail?.foundData.firstContents.split(" ").map((word, idx) => (
                <Text style={styles.storyContentsText} key={idx}>
                  {word}{" "}
                </Text>
              ))}
            </View>
            <View style={styles.storyContentsTextSplit}>
              {detail?.foundData.secondContents.split(" ").map((word, idx) => (
                <Text style={[styles.storyContentsText]} key={idx}>
                  {word}{" "}
                </Text>
              ))}
            </View>
            <View style={styles.storyContentsTextSplit}>
              {detail?.foundData.thirdContents.split(" ").map((word, idx) => (
                <Text style={styles.storyContentsText} key={idx}>
                  {word}{" "}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.storyAddressBox}>
            <Image
              style={styles.pinImage}
              source={require("@assets/icons/pin.png")}
            />
            <Text style={styles.storyAddress}>{detail?.foundData.address}</Text>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  dailyWhoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingLeft: 24,
  },
  who: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontFamily: "spoqaB",
    fontSize: 20,
  },
  nameText: {
    fontFamily: "spoqaR",
    fontSize: 20,
  },
  dotImage: {
    width: "100%",
    height: "100%",
  },
  storyImage: {
    width,
    height: 300,
    resizeMode: "stretch",
    marginBottom: 24,
  },
  storyContentsBox: {
    paddingHorizontal: 24,
  },

  storyContentsImage: {
    width: 30,
    height: 30,
    marginRight: 24,
  },
  storyContentsTitle: {
    fontFamily: "spoqaB",
    fontSize: 20,
    marginBottom: 16,
  },
  stroyContentsDate: {
    fontFamily: "spoqaR",
    fontSize: 14,
    color: `${theme.colors.sliverGray}`,
    marginBottom: 16,
  },
  storyContentsTextSplit: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  storyContentsText: {
    fontFamily: "spoqaR",
    fontSize: 12,
    lineHeight: 20,
  },
  storyAddressBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  storyAddress: {
    fontFamily: "spoqaR",
    fontSize: 10,
    color: `${theme.colors.sliverGray}`,
  },
  editBottomTabBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },

  editBottomTabIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  editBottomTabText: {
    fontFamily: "spoqaB",
    fontSize: 16,
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
  },
});

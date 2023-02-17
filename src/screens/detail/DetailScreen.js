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
import { useCallback, useMemo, useRef, useState } from "react";
import HeaderBackBtn from "../../components/items/HeaderBackBtn";
import AskModal from "../../components/modal/AskModal";
const { width } = Dimensions.get("window");
const DetailScreen = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const editBottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["18%"], []);
  const editModalHandler = useCallback(() => {
    editBottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
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

  const onPressDelete = () => {
    editBottomSheetRef.current?.dismiss();
    setDeleteModalVisible((prev) => !prev);
  };

  const deleteModalHandler = () => {
    setDeleteModalVisible((prev) => !prev);
  };
  return (
    <BottomSheetModalProvider>
      <AskModal
        isVisible={deleteModalVisible}
        deleteHandler={deleteModalHandler}
        firstText="일기를"
        secondText="삭제하시겠습니까?"
      />
      <BottomSheetModal
        ref={editBottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Pressable style={styles.editBottomTabBox}>
            <Image
              style={styles.editBottomTabIcon}
              source={require("@assets/icons/bottomTab/bottomWriteIcon.png")}
            />
            <Text style={styles.editBottomTabText}>수정하기</Text>
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
            <Text style={styles.name}>민영</Text>
            <Text style={styles.nameText}>님의 하루</Text>
          </View>
          <Pressable
            style={{
              height: 30,
              width: 20,
              alignItems: "flex-end",
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
          source={require("@assets/testImage/testImg.png")}
        />
        <View style={styles.storyContentsBox}>
          <Text style={styles.storyContentsTitle}>오늘은 용산에서 데이트!</Text>
          <Text style={styles.stroyContentsDate}>MON JUL 18 / 2022</Text>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <Image
              style={styles.storyContentsImage}
              source={require("@assets/icons/feeling/cry.png")}
            />
            <Image
              style={styles.storyContentsImage}
              source={require("@assets/icons/feeling/cry.png")}
            />
            <Image
              style={styles.storyContentsImage}
              source={require("@assets/icons/feeling/cry.png")}
            />
            <Image
              style={styles.storyContentsImage}
              source={require("@assets/icons/feeling/cry.png")}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <View style={styles.storyContentsTextSplit}>
              {"전에 갔던 리틀갱스터 버섯밥 뭐시기가 너무 맛있어서 또 가자고 했다."
                .split(" ")
                .map((word, idx) => (
                  <Text style={styles.storyContentsText} key={idx}>
                    {word}{" "}
                  </Text>
                ))}
            </View>
            <View style={styles.storyContentsTextSplit}>
              {"비고미 쿠키도 먹고!! 비고미 베이커리 쪽 시장에 엄청난 순대 맛집을 발견했다...!!"
                .split(" ")
                .map((word, idx) => (
                  <Text style={[styles.storyContentsText]} key={idx}>
                    {word}{" "}
                  </Text>
                ))}
            </View>
            <View style={styles.storyContentsTextSplit}>
              {"좋은사람과 맛있는 음식, 역시 최고다!! 그래도 코딩은 해야지!!!"
                .split(" ")
                .map((word, idx) => (
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
            <Text style={styles.storyAddress}>
              서울특별시 용산구 한남동 용문시장 순대집에서
            </Text>
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
    paddingHorizontal: 24,
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
  },
});

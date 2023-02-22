import axios from "axios";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import UserFlowBtn from "../../components/buttons/UserFlowBtn";
import useNav from "../../components/hooks/useNav";
import UserFlowInput from "../../components/inputs/UserFlowInput";
import FindIdItem from "../../components/items/FindIdItem";
import { BACK_API } from "react-native-dotenv";
import ConfirmModal from "../../components/modal/ConfirmModal";

const FindIdScreen = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = useCallback(() => {
    setErrorModalVisible((prev) => !prev);
  }, []);

  const findIdFormHandler = (e) => {
    const {
      nativeEvent: { text },
    } = e;
    setName(text);
  };

  const findIdHandler = async () => {
    setError(false);
    if (name.length < 2 || name.length > 6) {
      setError((prev) => !prev);
      return null;
    }
    setIsLoading((prev) => !prev);
    try {
      const { data } = await axios.post(`${BACK_API}users/findId`, {
        name,
      });
      setResult(data);
      setIsLoading((prev) => !prev);
    } catch (err) {
      setResult(null);
      setErrorModalVisible((prev) => !prev);
      setIsLoading((prev) => !prev);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ConfirmModal
          isVisible={errorModalVisible}
          closeModalHandler={closeModalHandler}
          title="아이디가 없습니다."
        />
        <View style={{ flex: 1 }}>
          <View style={styles.searchBox}>
            <UserFlowInput
              placeholder=" 닉네임"
              keyboardType="email-address"
              error={error}
              errorText="닉네임은 2글자 이상 6글자 이하입니다."
              style={{ marginBottom: 14 }}
              onChange={(e) => findIdFormHandler(e)}
              maxLength={6}
            />
            <UserFlowBtn
              text="아이디 찾기"
              onPress={findIdHandler}
              isComplete={name}
              isLoading={isLoading}
            />
          </View>
          <View style={styles.userBox}>
            <ScrollView
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 40 }}
            >
              {result &&
                result.foundUser.map((el) => (
                  <FindIdItem
                    key={el._id}
                    name={el.name}
                    email={el.email}
                    image={el.profileImg}
                  />
                ))}
            </ScrollView>
            <UserFlowBtn
              text="로그인"
              isComplete={true}
              onPress={useNav("SignIn")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindIdScreen;

const styles = StyleSheet.create({
  searchBox: {
    marginBottom: 30,
  },
  userBox: {
    height: 400,
  },
});

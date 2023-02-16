import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserFlowBtn from "../../components/buttons/userFlowBtn";
import useNav from "../../components/hooks/useNav";
import UserFlowInput from "../../components/inputs/userFlowInput";

const DUMMY = [
  { id: 0, name: "일영", email: "lemin1@naver.com" },
  { id: 1, name: "이영", email: "lemin2@naver.com" },
  { id: 2, name: "삼영", email: "lemin3@naver.com" },
  { id: 3, name: "사영", email: "lemin4@naver.com" },
  { id: 4, name: "오영", email: "lemin5@naver.com" },
  { id: 5, name: "육영", email: "lemin6@naver.com" },
  { id: 6, name: "칠영", email: "lemin7@naver.com" },
  { id: 7, name: "팔영", email: "lemin8@naver.com" },
  { id: 8, name: "구영", email: "lemin9@naver.com" },
  { id: 9, name: "십영", email: "lemin0@naver.com" },
  { id: 10, name: "십영", email: "lemin10@naver.com" },
  { id: 11, name: "십영", email: "lemin11@naver.com" },
  { id: 12, name: "십영", email: "lemin12@naver.com" },
  { id: 13, name: "십영", email: "lemin13@naver.com" },
  { id: 14, name: "십영", email: "lemin14@naver.com" },
  { id: 15, name: "십영", email: "lemin15@naver.com" },
  { id: 16, name: "십영", email: "lemin16@naver.com" },
  { id: 17, name: "십영", email: "lemin17naver.com" },
];

const FindIdScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1 }}>
          <View style={styles.searchBox}>
            <UserFlowInput
              placeholder=" 닉네임"
              keyboardType="email-address"
              errorText="닉네임은 2글자 이상 6글자 이하입니다."
              style={{ marginBottom: 14 }}
            />
            <UserFlowBtn text="아이디 찾기" />
          </View>
          <View style={styles.userBox}>
            <ScrollView
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 40 }}
            >
              {DUMMY.map((el) => (
                <View key={el.id} style={{ flexDirection: "row" }}>
                  <Text>{el.name}</Text>
                  <Text>{el.email}</Text>
                </View>
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
    marginBottom: 40,
  },
  userBox: {
    height: 400,
  },
});

import { Modal, StatusBar, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import theme from "../../utils/theme";
import SelectBtn from "../buttons/SelectBtn";

const LocationModal = ({ isVisible, modalHandler, autoCompleteHandler }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>장소를 검색해 주세요.</Text>
          <View
            style={{
              //   flex: 1,
              height: 350,
              width: "100%",
            }}
          >
            <GooglePlacesAutocomplete
              minLength={2}
              placeholder=" 어디에 있었나요?"
              query={{
                key: GOOGLE_API_KEY,
                language: "ko",
                components: "country:kr",
              }}
              keyboardShouldPersistTaps={"handled"}
              fetchDetails={true}
              onPress={autoCompleteHandler}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={styles.search}
            />
          </View>
        </View>
        <View style={{ paddingTop: 60 }}>
          <SelectBtn title="닫기" onPress={modalHandler} />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "spoqaB",
    fontSize: 20,
    marginBottom: 24,
  },

  search: {
    container: {},
    textInputContainer: {
      flexDirection: "row",
    },
    textInput: {
      backgroundColor: `${theme.colors.gray}`,
      borderRadius: 8,
      paddingVertical: 9,
      paddingHorizontal: 12,
      fontSize: 16,
      fontFamily: "spoqaR",
      color: "#6c6c6e",
    },
    listView: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
      paddingHorizontal: 10,
      elevation: 8,
      shadowColor: "#6164BB",
    },
    row: {
      paddingVertical: 20,
    },
    separator: {
      height: 2,
      backgroundColor: "#c8c7cc",
    },
    description: {
      fontSize: 15,
      fontFamily: "spoqaR",
    },
    loader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 20,
    },
  },
});

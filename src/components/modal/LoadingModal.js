import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      style={{ backgroundColor: "transparent" }}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>잠시만 기다려 주세요.</Text>
          <ActivityIndicator
            size="large"
            color={`${theme.colors.lightPurple}`}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "60%",
    backgroundColor: `${theme.colors.white}`,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
    shadowColor: `${theme.colors.darkPurple}`,
    paddingVertical: 30,
  },
  modalText: {
    fontFamily: "spoqaB",
    fontSize: 16,
    color: `${theme.colors.blackGray}`,
    textAlign: "center",
    marginBottom: 16,
  },
});

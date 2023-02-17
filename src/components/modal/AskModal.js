import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const AskModal = ({ isVisible, deleteHandler, firstText, secondText }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <Pressable style={styles.container} onPress={deleteHandler}>
        <View style={styles.modalBox}>
          <View style={styles.modalTextBox}>
            <Text style={styles.modalText}>{firstText}</Text>
            <Text style={styles.modalText}>{secondText}</Text>
          </View>
          <Pressable style={styles.modalButtonBox}>
            <Text
              style={[styles.modalButtonText, { color: `${theme.colors.red}` }]}
            >
              삭제
            </Text>
          </Pressable>
          <Pressable style={styles.modalButtonBox} onPress={deleteHandler}>
            <Text
              style={[
                styles.modalButtonText,
                { color: `${theme.colors.sliverGray}` },
              ]}
            >
              취소
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AskModal;

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
  },
  modalTextBox: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
  },
  modalText: {
    fontFamily: "spoqaM",
    fontSize: 18,
    color: `${theme.colors.blackGray}`,
  },

  modalButtonBox: {
    width: "100%",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.inputBorder}`,
    alignItems: "center",
  },

  modalButtonText: {
    fontFamily: "spoqaM",
    fontSize: 16,
  },
});
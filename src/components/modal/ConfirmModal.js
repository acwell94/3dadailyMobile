import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../utils/theme";

const ConfirmModal = ({ isVisible, closeModalHandler, title }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <Pressable style={styles.container} onPress={closeModalHandler}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>{title}</Text>
          <Pressable style={styles.modalButtonBox} onPress={closeModalHandler}>
            <Text
              style={[
                styles.modalButtonText,
                { color: `${theme.colors.sliverGray}` },
              ]}
            >
              확인
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModal;

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
  modalText: {
    paddingVertical: 16,
    fontFamily: "spoqaB",
    fontSize: 16,
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

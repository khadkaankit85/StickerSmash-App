import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AddEmojiModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const AddEmojiModal = ({
  isVisible,
  children,
  onClose,
}: AddEmojiModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onDismiss={() => {
        onClose();
      }}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text
            style={{
              color: "#fff",
              width: "60%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              textAlign: "right",
              fontSize: 17,
            }}
          >
            Select a Sticker
          </Text>
          <View
            style={{
              display: "flex",
              width: "40%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Pressable
              onPress={() => {
                onClose();
              }}
            >
              <MaterialIcons
                size={30}
                name="close"
                color={"white"}
                style={{ marginRight: 25 }}
              />
            </Pressable>
          </View>
        </View>
        <View>{children}</View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    height: "35%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  modalContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Added
    marginTop: 10,
  },
});

export default AddEmojiModal;

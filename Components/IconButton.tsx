import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconButtonProps {
  icon: "refresh" | "add" | "delete" | "save-alt";
  iconlabel: string;
  onPressFunction: () => void;
}
const IconButton = ({ icon, iconlabel, onPressFunction }: IconButtonProps) => {
  return (
    <Pressable
      onPress={() => {
        onPressFunction();
      }}
      style={styles.iconButton}
    >
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{iconlabel}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
export default IconButton;

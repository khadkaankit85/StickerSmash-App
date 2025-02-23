import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CircleButtonProps {
  onPressFunction: () => void;
}

const CircleButton = ({ onPressFunction }: CircleButtonProps) => {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable onPress={onPressFunction} style={styles.circleButton}>
        <MaterialIcons name="add" size={32} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
export default CircleButton;

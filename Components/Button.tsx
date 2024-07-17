import { Pressable, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
interface ButtonProps {
  buttonLabel: string;
  Theme: "Primary" | "Secondary";
  onPressFunction: () => void;
}

const Button = ({ buttonLabel, Theme, onPressFunction }: ButtonProps) => {
  if (Theme === "Primary") {
    return (
      <View
        style={[
          style.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[
            style.pressablePart,
            {
              justifyContent: "space-evenly",
              backgroundColor: "white",
            },
          ]}
          onPress={onPressFunction}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={[style.buttonIcon, { transform: [{ translateX: 40 }] }]}
          />
          <Text
            style={[
              style.buttonLabel,
              {
                color: "#25292e",
              },
            ]}
          >
            {buttonLabel}
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={style.buttonContainer}>
      <Pressable
        onPress={() => {
          alert("Button Pressed");
          onPressFunction();
        }}
        style={[
          style.pressablePart,
          {
            justifyContent: "center",
          },
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Text style={[style.buttonLabel, { justifyContent: "center" }]}>
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
};
const style = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 7,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  pressablePart: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLabel: {
    color: "white",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});

export default Button;

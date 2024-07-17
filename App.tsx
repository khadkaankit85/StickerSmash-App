import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
const PlaceholderImage: ImageSourcePropType = require("./assets/images/background-image.png");
import ImageViewer from "./Components/ImageViewer";
import Button from "./Components/Button";
import CircleButton from "./Components/CircleButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function App() {
  const [selectedImageURI, setSelectedImageURI] =
    useState<ImageSourcePropType>(PlaceholderImage);

  const [showAppOptions, setShowAppOptions] = useState(false);

  const ImagePickerAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: undefined,
    });

    if (!result.canceled) {
      setSelectedImageURI(result.assets[0].uri as ImageSourcePropType);
      setShowAppOptions(true);
    } else {
      alert("You have cancelled the image picker");
    }
  };

  return (
    <View style={styles.container}>
      {!showAppOptions && (
        <View>
          <View style={styles.imageContainer}>
            <ImageViewer PlaceholderImage={selectedImageURI} />
          </View>
          <View style={styles.pageFooter}>
            <Button
              buttonLabel={"Choose a Photo"}
              Theme={"Primary"}
              onPressFunction={ImagePickerAsync}
            />

            <Button
              buttonLabel={"Use This Photo"}
              Theme={"Secondary"}
              onPressFunction={() => {
                setShowAppOptions(true);
              }}
            />
          </View>

          {showAppOptions && (
            <View style={styles.pageFooter}>
              <CircleButton onPressFunction={() => {}} />
              <Button
                buttonLabel={"Save"}
                Theme={"Primary"}
                onPressFunction={() => {}}
              />
              <Button
                buttonLabel={"Cancel"}
                Theme={"Secondary"}
                onPressFunction={() => {
                  setShowAppOptions(false);
                }}
              />
            </View>
          )}
        </View>
      )}

      <Pressable
        onPress={() => {
          setShowAppOptions(!showAppOptions);
        }}
        style={{ backgroundColor: "red", flex: 1 / 10 }}
      >
        <Text>Press Me</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  pageFooter: {
    flex: 1 / 3,
    alignItems: "center",
  },
});

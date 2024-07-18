import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, ImageSourcePropType, Platform } from "react-native";
const PlaceholderImage: ImageSourcePropType = require("./assets/images/background-image.png");
import ImageViewer from "./Components/ImageViewer";
import Button from "./Components/Button";
import CircleButton from "./Components/CircleButton";
import IconButton from "./Components/IconButton";
import AddEmojiModal from "./Components/AddEmojiModal";
import ListOfEmoji from "./Components/ListOfEmoji";
import EmojiSticker from "./Components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

import { useState, useRef } from "react";

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef<null | View>(null);

  if (status === null) {
    requestPermission();
  }

  const [selectedImageURI, setSelectedImageURI] =
    useState<ImageSourcePropType>(PlaceholderImage);

  const [makeEmojiModalVisible, setmakeEmojiModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedEmoji, setSelectedEmoji] =
    useState<ImageSourcePropType | null>(null);

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

  const onResetButtonPress = () => {
    setSelectedImageURI(PlaceholderImage);
    setShowAppOptions(false);
    setSelectedEmoji(null);
  };

  const onDownloadImageButtonPress = async () => {
    if (Platform.OS != "web") {
      try {
        const uri = await captureRef(imageRef, {
          format: "jpg",
          height: 440,
          quality: 1,
        });

        MediaLibrary.saveToLibraryAsync(uri);
        if (uri) {
          alert("Downloaded");
        }
      } catch {
        alert("Error in downloading image");
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(
          imageRef.current as unknown as Node,
          {
            quality: 0.95,
            width: 320,
            height: 440,
          }
        );

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onAddSticker = () => {
    setmakeEmojiModalVisible(true);
  };

  const onSelectFunction = (image: ImageSourcePropType) => {
    console.log("selected emoji, line number 60", image);
    setSelectedEmoji(image);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer} collapsable={false}>
        <View
          ref={imageRef}
          style={{
            backgroundColor: "#25292e",
            height: 440,
          }}
        >
          <ImageViewer PlaceholderImage={selectedImageURI} />
          {selectedEmoji && <EmojiSticker source={selectedEmoji} />}
        </View>
      </View>

      {!showAppOptions && (
        <View>
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
        </View>
      )}

      {showAppOptions && (
        <View
          style={[
            {
              width: "70%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            },
            styles.pageFooter,
          ]}
        >
          <IconButton
            icon="refresh"
            iconlabel="Refresh"
            onPressFunction={() => {
              onResetButtonPress();
            }}
          />

          <CircleButton
            onPressFunction={() => {
              onAddSticker();
            }}
          />
          <IconButton
            icon="save-alt"
            iconlabel="Download"
            onPressFunction={() => {
              onDownloadImageButtonPress();
            }}
          />
        </View>
      )}

      <AddEmojiModal
        isVisible={makeEmojiModalVisible}
        onClose={() => {
          setmakeEmojiModalVisible(false);
        }}
        children={
          <ListOfEmoji
            onSelect={onSelectFunction}
            onCloseModal={() => setmakeEmojiModalVisible(false)}
          />
        }
      />

      <StatusBar style="light" />
    </GestureHandlerRootView>
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

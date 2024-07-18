import { View, Image, ImageSourcePropType } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface EmojiStickerProps {
  source: ImageSourcePropType | string;
}
const EmojiSticker = ({ source }: EmojiStickerProps) => {
  const scaleImage = useSharedValue(100);

  const imagePositionX = useSharedValue(0);
  const imagePositionY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value === 100) {
        scaleImage.value = 200;
      } else {
        scaleImage.value = 100;
      }
    });

  const panDetector = Gesture.Pan().onChange((event) => {
    imagePositionX.value += event.changeX;
    imagePositionY.value += event.changeY;
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: imagePositionX.value },
        { translateY: imagePositionY.value },
      ],
    };
  });

  const imgUrl = typeof source === "string" ? { uri: source } : source;
  return (
    <GestureDetector gesture={panDetector}>
      <Animated.View
        style={[
          {
            top: -350,
            width: scaleImage,
            height: scaleImage,
          },
          containerStyle,
        ]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={imgUrl}
            resizeMode="contain"
            style={[imageStyle, { width: 100, height: 100 }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
};

export default EmojiSticker;

import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface ImageViewerProps {
  PlaceholderImage: ImageSourcePropType;
}

const ImageViewer = ({ PlaceholderImage }: ImageViewerProps) => {
  const imageSource =
    typeof PlaceholderImage === "string"
      ? { uri: PlaceholderImage }
      : PlaceholderImage;
  return <Image style={style.PlaceholderImage} source={imageSource} />;
};

const style = StyleSheet.create({
  PlaceholderImage: { width: 320, height: 440, borderRadius: 18 },
});
export default ImageViewer;

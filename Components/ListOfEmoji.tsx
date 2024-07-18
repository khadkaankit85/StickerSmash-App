import {
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useState } from "react";

interface ListOfEmojiProps {
  onSelect: (emoji: ImageSourcePropType) => void;
  onCloseModal: () => void;
}
const ListOfEmoji = ({ onSelect, onCloseModal }: ListOfEmojiProps) => {
  const [emoji] = useState([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
    require("../assets/images/emoji7.png"),
    require("../assets/images/emoji8.png"),
    require("../assets/images/emoji9.png"),
    require("../assets/images/emoji10.png"),
    require("../assets/images/emoji11.png"),
  ]);
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={style.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image key={index} source={item} style={style.image} />
          </Pressable>
        );
      }}
    />
  );
};

const style = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 20,
    marginTop: 40,
  },
});

export default ListOfEmoji;

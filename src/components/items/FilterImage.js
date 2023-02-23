import { memo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import theme from "../../utils/theme";

const FilterImage = ({ data, onPress, selected }) => {
  return (
    <Pressable
      style={[
        styles.conditionImageBox,
        selected.category === data.category && selected.sort === String(data.id)
          ? { elevation: 2 }
          : null,
      ]}
      onPress={() => onPress(data.category, String(data.id))}
    >
      <Image style={{ width: 30, height: 30 }} source={data.img} />
    </Pressable>
  );
};

export default memo(FilterImage);

const styles = StyleSheet.create({
  conditionImageBox: {
    marginVertical: 2,
    marginRight: 13,
    marginLeft: 2,
    padding: 10,
    borderRadius: 40,

    shadowColor: `${theme.colors.darkPurple}`,
    backgroundColor: "white",
  },
});

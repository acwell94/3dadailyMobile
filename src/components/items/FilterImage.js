import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

const FilterImage = ({ data }) => {
  return (
    <View style={styles.conditionImageBox}>
      <Image style={{ width: 30, height: 30 }} source={data.img} />
    </View>
  );
};

export default memo(FilterImage);

const styles = StyleSheet.create({
  conditionImageBox: {
    marginRight: 15,
  },
});

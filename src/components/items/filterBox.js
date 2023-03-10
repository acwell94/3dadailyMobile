import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feeling, Weather, WithWhom } from "../../utils/contents";
import theme from "../../utils/theme";
import FilterImage from "./FilterImage";

const FilterBox = ({ name, count, getSortedContents, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[styles.container]}>
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        style={[styles.filterInfoBox, { marginBottom: isOpen ? 12 : 0 }]}
      >
        <View style={styles.filterInfo}>
          <View style={styles.manyOfContents}>
            <Text style={styles.serviceName}>3다일기</Text>
            <Text style={styles.contents}>{count}</Text>
          </View>
          <View>
            <Text style={styles.who}>{name} 님의 추억을 찾아보세요</Text>
          </View>
        </View>
        <View>
          <Image
            style={{
              width: 18,
              height: 18,
              transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
            }}
            source={require("@assets/icons/downArrow.png")}
          />
        </View>
      </Pressable>
      {isOpen && (
        <View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.conditionTitle}>기분</Text>
            <ScrollView
              scrollEnabled
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {Feeling.map((el) => (
                <FilterImage
                  key={el.id}
                  data={el}
                  selected={selected}
                  onPress={getSortedContents}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.conditionTitle}>날씨</Text>
            <ScrollView
              scrollEnabled
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {Weather.map((el) => (
                <FilterImage
                  key={el.id}
                  data={el}
                  selected={selected}
                  onPress={getSortedContents}
                />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.conditionTitle}>누구와</Text>
            <ScrollView
              scrollEnabled
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {WithWhom.map((el) => (
                <FilterImage
                  key={el.id}
                  data={el}
                  selected={selected}
                  onPress={getSortedContents}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#6164BB",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 16,
    width: "98%",
  },
  filterInfoBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  manyOfContents: {
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: `${theme.colors.inputBorder}`,
    paddingRight: 16,
    marginRight: 16,
  },
  serviceName: {
    fontFamily: "spoqaR",
    fontSize: 12,
    fontWeight: "400",
    color: `${theme.colors.middleGray}`,
  },
  contents: {
    fontFamily: "spoqaB",
    fontSize: 18,
    fontWeight: "700",
  },
  who: {
    fontFamily: "spoqaB",
    fontSize: 12,
  },
  conditionTitle: {
    fontFamily: "spoqaB",
    marginBottom: 12,
  },
  conditionImageBox: {
    marginRight: 15,
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

const WalkThroughItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const reducedWidth = width - 10;
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width: width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    height: 900,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#344034",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});

export default WalkThroughItem;

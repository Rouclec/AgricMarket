import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Animated,
  SliderBase,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import walkthroughData from "../data/walkthroughData";
import WalkThroughItem from "../components/WalkThroughItem";
import Indicator from "../components/Indicator";
import NextButton from "../components/NextButton";

import { auth } from "../auth/Firebase";
const Walkthrough = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  const slideRef = React.useRef(null);

  const navigation = useNavigation();

  const scrollTo = async () => {
    if (currentIndex < walkthroughData.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        user = auth.currentUser;
        if (user) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Login");
        }
        await AsyncStorage.setItem("@viewedOnBoarding", "true");
      } catch (error) {
        console.log("error setting on boarding", error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={walkthroughData}
          renderItem={({ item }) => <WalkThroughItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>

      <Indicator data={walkthroughData} scrollX={scrollX} />

      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / walkthroughData.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Walkthrough;

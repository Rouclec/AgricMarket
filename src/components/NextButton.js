import React from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";

import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = React.useRef(new Animated.Value(0)).current;
  const progressRef = React.useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
  }, [percentage]);

  React.useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  "circumference ", circumference;
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6E7E8"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          ref={progressRef}
          stroke="#49a146"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#49a146",
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;

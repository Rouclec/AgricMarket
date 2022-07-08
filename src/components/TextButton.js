import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const TextButton = ({
  enabled = true,
  label,
  customContainerStyle,
  customLabelStyle,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={!enabled}
      style={
        icon
          ? {
              flexDirection: "row",
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              ...customContainerStyle,
            }
          : {
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              ...customContainerStyle,
            }
      }
      onPress={onPress}
    >
      <Text
        style={
          icon
            ? {
                marginRight: SIZES.base,
                ...FONTS.h2,
                ...customLabelStyle,
              }
            : {
                ...FONTS.h2,
                ...customLabelStyle,
              }
        }
      >
        {label}
      </Text>
      {icon && <Image source={icon} style={{ width: 25, height: 25 }} />}
    </TouchableOpacity>
  );
};

export default TextButton;

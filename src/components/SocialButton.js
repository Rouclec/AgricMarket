import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({
  buttonType,
  color,
  backgroundColor,
  buttonTitle,
  ...rest
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor,
          height: height / 15,
          marginBottom: 15,
        },
      ]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          style={styles.icon}
          name={buttonType}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.buttonTextWrapper}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "90%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  buttonTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
});

export default SocialButton;

import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const FormButton = ({
  buttonTitle,
  disabled = false,
  backgroundColor = "#49a146",
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      {...rest}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "50%",
    height: windowHeight / 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
});

export default FormButton;

import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const FormInput = ({
  iconName,
  labelValue,
  placeholder,
  borderColor = "#ccc",
  customHeight,
  customWidth,
  unit,
  other,
  secureTextEntry = false,
  ...rest
}) => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.inputContainer,
        {
          height: customHeight ? customHeight : height / 12,
          borderColor: borderColor,
        },
        other,
      ]}
    >
      {iconName && (
        <View style={[styles.iconStyle, { borderColor: borderColor }]}>
          <AntDesign name={iconName} size={25} color="#666" />
        </View>
      )}
      <TextInput
        value={labelValue}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        numberOfLines={1}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {unit && (
        <View
          style={[
            styles.unit,
            {
              height: customHeight ? customHeight : height / 12,
              borderColor: borderColor,
            },
          ]}
        >
          <Text>{unit}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadiusColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  unit: {
    padding: 10,
    backgroundColor: "#ccc",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default FormInput;

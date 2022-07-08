import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { auth } from "../auth/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = (props) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordMatch, setPasswordMatch] = React.useState(true);

  const validateInput = (text) => {
    if (text === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const signUp = async () => {
    setEmail("");
    setPassword("");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert("User created Successfully");
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(`${error.code} error creating user ${error.message}`);
      });
  };

  const navigation = useNavigation();
  const disabled = !(passwordMatch && email);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo1.jpeg")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>Agric Market</Text>
      <FormInput
        placeholder={"Email"}
        iconName={"user"}
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        input="email"
      />
      <FormInput
        placeholder={"Password"}
        iconName={"lock"}
        onChangeText={(text) => {
          setPassword(text);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />

      <FormInput
        placeholder={"Confirm Password"}
        iconName={"lock"}
        onChangeText={(text) => {
          validateInput(text);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        borderColor={passwordMatch ? "#ccc" : "#de4d41"}
      />
      {!passwordMatch && (
        <Text style={{ color: "#de4d41" }}>Passwords do not match!!</Text>
      )}
      <FormButton
        buttonTitle={"Sign Up"}
        backgroundColor={disabled ? "#cccccc" : "#49a146"}
        onPress={signUp}
        disabled={disabled}
      />
      <SocialButton
        buttonTitle="Sign up with Facebook"
        buttonType="facebook"
        color="#4867aa"
        backgroundColor={"#e6eaf4"}
        onPress={() => alert("Facebook Signup")}
      />
      <SocialButton
        buttonTitle="Sign up with Google"
        buttonType="google"
        color="#de4d41"
        backgroundColor={"#f5e7ea"}
        onPress={() => alert("Google Signup")}
      />
      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.navButtonText}>
          Already have an account? Login here!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafd",
    padding: 20,
  },
  logoContainer: {
    width: 80,
    borderWidth: 1,
    borderColor: "#051d5f",
    borderRadius: 60,
    marginBottom: 30,
    alignSelf: "flex-start",
  },
  logo: {
    height: 80,
    width: 80,
  },
  text: {
    top: -15,
    left: 1,
    fontFamily: "Kufum-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 20,
    color: "#344034",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#49a146",
    fontFamily: "Lato-Regular",
  },
  forgotButton: {},
  navButtonText: {
    color: "#493d8a",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f9fafd",
  },
});
export default SignupScreen;

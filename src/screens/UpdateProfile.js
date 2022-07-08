import { useNavigation } from "@react-navigation/native";
import { Box, CheckIcon, Select } from "native-base";
import React, { useReducer } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { auth, db } from "../auth/Firebase";
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import COLORS from "../../constants/colors";
import { signOut } from "firebase/auth";

const UpdateProfile = (props) => {
  const navigation = useNavigation();
  const [fullname, setFullname] = React.useState();
  const [gender, setGender] = React.useState();
  const [weight, setWeight] = React.useState();
  const [height, setHeight] = React.useState();
  const [userType, setUserType] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const email = auth.currentUser?.email;
  const id = auth.currentUser?.uid;

  const formFilled = fullname && userType;
  if (id) {
    const userRef = doc(db, "users", id);
  }

  const updateUser = async () => {
    const user = {
      email: email,
      id: id,
      fullname: fullname,
      userType: userType,
      created: Timestamp.now(),
    };

    try {
      const docRef = await setDoc(doc(db, "users", id), user);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error creating user ", error);
    }
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        alert("Successfully Signed Out!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("error logging out: ", error);
      });
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo1.jpeg")}
            style={styles.logo}
          />
        </View>
        {id ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
            onPress={logOut}
          >
            <Text style={styles.skipText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.skipText}>Login</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.text}>Update Your Profile</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1, alignItems: "center" }}
        >
          <FormInput
            labelValue={fullname ? fullname : null}
            placeholder={"Full name"}
            onChangeText={(text) => {
              setFullname(text);
            }}
            autoCorrect={false}
            customHeight={40}
          />
          <Box w="100%" h={10} mb={2}>
            <Select
              selectedValue={userType}
              minW="200"
              borderColor={"#ccc"}
              borderRadius={"lg"}
              color="black"
              fontSize={14}
              backgroundColor={"white"}
              accessibilityLabel="User Type"
              placeholder="User Type"
              placeholderTextColor="#ccc"
              _selectedItem={{
                bg: "violet.900",
                borderRadius: 15,
                endIcon: <CheckIcon size="5" />,
              }}
              h={10}
              onValueChange={(itemValue) => setUserType(itemValue)}
            >
              <Select.Item label="Farmer" value="Farmer" />
              <Select.Item label="Buyer" value="Buyer" />
            </Select>
          </Box>

          <FormButton
            buttonTitle={"Update"}
            backgroundColor={!formFilled ? "#cccccc" : "#49a146"}
            onPress={updateUser}
            disabled={!formFilled}
          />
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f9fafd",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9fafd",
    paddingHorizontal: 10,
  },
  logoContainer: {
    width: 80,
    borderWidth: 1,
    borderColor: "#051d5f",
    borderRadius: 60,
    marginBottom: 20,
    alignContent: "center",
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    borderRadius: 50,
  },
  text: {
    fontFamily: "Kufum-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 20,
    color: "#344034",
    textAlign: "center",
  },
  skipText: {
    color: "#493d8a",
  },
});
export default UpdateProfile;

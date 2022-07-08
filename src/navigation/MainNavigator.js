import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import Checkout from "../screens/Checkout";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Login";
import ProductDetails from "../screens/ProductDetails";
import SignupScreen from "../screens/SignUp";
import UpdateProfile from "../screens/UpdateProfile";
import Walkthrough from "../screens/Walkthrough";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Walkthrough" component={Walkthrough} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Update" component={UpdateProfile} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

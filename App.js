import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/store";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider config={config}>
        <MainNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

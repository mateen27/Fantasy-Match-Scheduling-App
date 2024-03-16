import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Button } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";
import RegisterScreen from "./src/screens/Authentication/Register";

export default function App() {
  return (
    // <NativeBaseProvider>
    //   <Box>Hello world</Box>
    //   <Button onPress={() => console.log("hello world")}>Click Me</Button>
    // </NativeBaseProvider>
    <AppNavigator/>
    // <RegisterScreen/>
  );
}
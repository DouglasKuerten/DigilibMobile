import * as React from 'react';
import { Image } from "react-native";
import { Center, useColorMode, useColorModeValue } from 'native-base'

export function HomeScreen() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center flex={1} _light={{ bgColor: 'gray.200' }} _dark={{ bgColor: 'dark.50' }}>

      {colorMode == 'dark' ? <Image style={{ width: "70%", height: 500, marginBottom: "15%" }} source={require("../assets/logofontebranca.png")}></Image> : <Image style={{ width: "70%", height: 500, marginBottom: "15%" }} source={require("../assets/logofontepreta.png")}></Image>}
    </Center>
  );
}
///*bgColor={"gray.300"}>*/
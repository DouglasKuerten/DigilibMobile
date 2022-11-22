import * as React from 'react';
import { Image } from "react-native";
import { Center } from 'native-base'

export function HomeScreen() {
  return (
    <Center flex={1} bgColor={"gray.300"}>
      <Image style={{ width: "70%", height: 500, marginBottom: "15%" }} source={require("../assets/logofontepreta.png")}></Image>
    </Center>
  );
}

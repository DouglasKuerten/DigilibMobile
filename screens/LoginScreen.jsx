import React, { useContext, useState } from "react";
import { View, Image } from "react-native";

import { Icon, Pressable, Center, Switch, useColorMode } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";

import { ButtonContained } from "../components/ButtonContained";
import { ButtonUnderline } from "../components/ButtonUnderline";

import { AuthContext } from "../navigation/AuthContext"

import AsyncStorage from '@react-native-async-storage/async-storage';

const setColorModeCache = async (value) => {
  try {
    await AsyncStorage.setItem('@colorMode', value)
  } catch (e) {

  }
}

const getColorModeCache = async () => {
  try {
    const value = await AsyncStorage.getItem('@colorMode')
    if (value !== null) {
      return value;
    }
  } catch (e) {

  }
}

export function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  const [switchValue, setSwitchValue] = useState(colorMode == 'light' ? false : true);
  async function toggleColorModeAndSave(value) {
    setSwitchValue(value)
    setColorMode(value ? 'dark' : 'light')
    await setColorModeCache(value ? 'dark' : 'light');
  }

  return (
    <Center flex={1} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
      {colorMode == 'dark' ? <Image style={{ width: "90%", height: "60%" }} source={require("../assets/logofontebranca.png")} /> : <Image style={{ width: "90%", height: "60%" }} source={require("../assets/logofontepreta.png")} />}
      <InputField onChangeText={(valueEmail) => setEmail(valueEmail)} w={{ base: "85%", md: "15%" }} mb={2} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="E-mail" />
      <InputField onChangeText={(valuePassword) => setPassword(valuePassword)} w={{ base: "85%", md: "15%" }} mb={2} type={show ? "text" : "password"} InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" /></Pressable>} placeholder="Senha" />
      <Switch offTrackColor="dark.100" onTrackColor="light.200" onThumbColor="dark.500" offThumbColor="light.300" onToggle={(value) => toggleColorModeAndSave(value)} value={switchValue} />
      <ButtonContained title="Entrar" onPress={login} w={'30%'} />
      <ButtonUnderline title="Visualização Livros" onPress={() => navigation.navigate("Visualização de Livros")} mt={2} />
    </Center>
  );
}

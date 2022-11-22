import React, { useContext, useState } from "react";
import { View, Image } from "react-native";

import { Icon, Pressable, Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";

import { ButtonContained } from "../components/ButtonContained";
import { ButtonUnderline } from "../components/ButtonUnderline";

import { AuthContext } from "../navigation/AuthContext"

export function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  return (
    <Center flex={1} bgColor={'gray.200'}>
      <Image style={{ width: "90%", height: "60%" }} source={require("../assets/logofontepreta.png")}></Image>

      <InputField w={{ base: "85%", md: "15%" }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="E-mail" />
      <InputField w={{ base: "85%", md: "15%" }} type={show ? "text" : "password"} InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" /></Pressable>} placeholder="Senha" />

      <ButtonContained title="Entrar" onPress={login}></ButtonContained>
      <ButtonUnderline title="Vizualicação Livros" onPress={() => navigation.navigate("Visualização de Livros")}></ButtonUnderline>
    </Center>
  );
}
import React, { useContext, useState } from "react";
import { View, Image } from "react-native";

import { Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";

import { ButtonContained } from "../components/ButtonContained";
import { ButtonClean } from "../components/ButtonClean";

import { AuthContext } from "../navigation/AuthContext"

export function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  return (
    <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: "#dfdfdd", justifyContent: "center", alignItems: 'center' }}>
      <Image style={{ width: "90%", height: "60%" }} source={require("../assets/logofontepreta.png")}></Image>

      <InputField w={{ base: "85%", md: "15%" }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="E-mail" />
      <InputField w={{ base: "85%", md: "15%" }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" /></Pressable>} placeholder="Senha" />

      <ButtonContained title="Entrar" mode="contained" onPress={login}></ButtonContained>
      <ButtonClean title="Vizualicação Livros" mode="contained" onPress={() => navigation.navigate("Visualização de Livros")}></ButtonClean>
    </View>
  );
}
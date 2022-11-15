import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { InputField } from "../components/InputField";
import { ButtonContained } from "../components/ButtonContained";
import { ButtonClean } from "../components/ButtonClean";

import { Select, CheckIcon, Box, Center } from "native-base";


export function RegUserScreen() {
  const [service, setService] = React.useState("");
  return (
    <Center pt={2}>
      <InputField w={{ base: "85%", md: "15%" }} placeholder={"Número da Matricula"}></InputField>
      <InputField w={{ base: "85%", md: "15%" }} placeholder={"Nome do Úsuario"}></InputField>
      <InputField w={{ base: "85%", md: "15%" }} mb="5px" placeholder={"E-mail"}></InputField>
      <Select selectedValue={service} variant={'rounded'} size={'md'} w={{ base: "85%", md: "15%" }} h="55px" mb="2px" bgColor="gray.300" shadow={1} placeholderTextColor={"gray.600"} placeholder="Grupo de Acesso" _selectedItem={{
        bg: "teal.600", endIcon: <CheckIcon size="4" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
        <Select.Item label="Administrador" value="A" />
        <Select.Item label="Professor" value="P" />
        <Select.Item label="Aluno" value="A" />
      </Select>


      <Text>Usuarios Cadastrados</Text>

      {/*  <ViewBooksScreen /> */}
    </Center>
  );
}

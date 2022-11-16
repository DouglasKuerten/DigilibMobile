import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { InputField } from "../components/InputField";
import { ButtonContained } from "../components/ButtonContained";
import { ButtonClean } from "../components/ButtonClean";

import { Select, CheckIcon, Box, Center } from "native-base";


export function RegUserScreen() {
  const [group, setGroup] = React.useState("");
  return (
    <Center pt={2}>
      <InputField w={{ base: "85%", md: "15%" }} placeholder={"Número da Matricula"}></InputField>
      <InputField w={{ base: "85%", md: "15%" }} placeholder={"Nome do Úsuario"}></InputField>
      <InputField w={{ base: "85%", md: "15%" }} mb="5px" placeholder={"E-mail"}></InputField>
      <Select selectedValue={group} variant={'rounded'} size={'lg'} borderRadius="10" w={{ base: "85%", md: "15%" }} h="55px" mb="2px" bgColor="gray.300" shadow={1} placeholderTextColor={"gray.600"} placeholder="Grupo de Acesso"
        _selectedItem={{
          bg: "grey.500", endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setGroup(itemValue)}>
        <Select.Item label="Administrador" value="ADMINISTRADOR" />
        <Select.Item label="Professor" value="PROFESSOR" />
        <Select.Item label="Aluno" value="ALUNO" />
      </Select>


      <Text>Usuarios Cadastrados</Text>

      {/*  <ViewBooksScreen /> */}
    </Center>
  );
}

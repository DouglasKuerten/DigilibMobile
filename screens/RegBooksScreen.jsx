import * as React from 'react';
import { Text } from 'react-native';
import { InputField } from "../components/InputField";
import { ViewBooksScreen } from './ViewBooksScreen';
import { Box } from "native-base";

export function RegBooksScreen() {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'} pt={1} >
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Código do Livro"}></InputField>
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Título do Livro"}></InputField>
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Autor do Livro"}></InputField>
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Editora do Livro"}></InputField>
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Categoria do Livro"}></InputField>
      <InputField w={{ base: "95%", md: "15%" }} placeholder={"Data Publicação do Livro"}></InputField>
      <Text>Livros Cadastrados</Text>
      <ViewBooksScreen />
    </Box>
  );
}
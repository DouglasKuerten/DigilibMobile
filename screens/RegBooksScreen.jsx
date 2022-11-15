import * as React from 'react';
import { Text } from 'react-native';
import { InputField } from "../components/InputField";

import { ViewBooksScreen } from './ViewBooksScreen';

import { Box, Icon, IconButton, Center, Skeleton } from "native-base";

export function RegBooksScreen() {
  return (
    <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Box padding={1}>
        <InputField w={"95%"} placeholder={"Código do Livro"}></InputField>
        <InputField w={"95%"} placeholder={"Título do Livro"}></InputField>
        <InputField w={"95%"} placeholder={"Autor do Livro"}></InputField>
        <InputField w={"95%"} placeholder={"Editora do Livro"}></InputField>
        <InputField w={"95%"} placeholder={"Categoria do Livro"}></InputField>
        <InputField w={"95%"} placeholder={"Data Publicação do Livro"}></InputField>
      </Box>
      <Text>Livros Cadastrados</Text>
      <ViewBooksScreen />
    </Box>
  );
}
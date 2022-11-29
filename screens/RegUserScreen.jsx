import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, Pressable, Center, Image, Row, Heading } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons } from "@expo/vector-icons";
import { URL_API_BACK_END } from '@env';

import * as ImagePicker from 'expo-image-picker';


export function RegUserScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const [dataInputs, setDataInputs] = useState({});
  const [doc, setDoc] = useState();

  async function setUser() {
    console.log("Exec")
    let reqs = await fetch(URL_API_BACK_END + 'users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration: dataInputs.registration,
        name: dataInputs.name,
        lastName: dataInputs.lastName,
        email: dataInputs.email,
        phoneNumber: dataInputs.phoneNumber,
        acessGroup: dataInputs.acessGroup,
        userImage: dataInputs.userImage
      })
    });
    let ress = await reqs.text();
    console.log(ress)
  }
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Você se recusou a permitir que este aplicativo acesse suas fotos!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });
    console.log(result)
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, bookImage: result.assets[0].uri });
      console.log(result.assets[0].uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Você se recusou a permitir que este aplicativo acesse sua câmera!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, });
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, bookImage: result.assets[0].uri });
      console.log(result.assets[0].uri);
    }
  }

  const validate = () => {
    if (dataInputs.registration == undefined) {
      setErrors({ ...errors, registration: 'A matrícula é obrigatória' });
      return false;
    } else if (!Number.isInteger(Number(dataInputs.registration))) {
      setErrors({ ...errors, registration: 'Somente números são aceitos na matrícula' });
      return false;
    } else if (dataInputs.registration.length > 11) {
      setErrors({ ...errors, registration: 'A matrícula informado é muito grande (Máx. 11)' });
      return false;
    }
    if (dataInputs.name == undefined) {
      setErrors({ ...errors, name: 'O nome é obrigatório' });
      return false;
    }
    if (dataInputs.lastName == undefined) {
      setErrors({ ...errors, lastName: 'O sobrenome é obrigatório' });
      return false;
    }
    if (dataInputs.acessGroup == undefined) {
      setErrors({ ...errors, acessGroup: 'O tipo de usuário é obrigatório' });
      return false;
    }
    setErrors({});
    return true;
  };

  const registerUser = () => {
    validate() ? setUser() : console.log('Validation Failed');
  };


  return (
    <VStack marginX={3} /* maxW="300px" */>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormControl isInvalid={'bookImage' in errors} mb={4} mt={2}>
          <Heading w={'100%'} textAlign={'center'} size={'md'} marginY={2}>Foto do Usuário</Heading>

          <Center flex={1} >
            <Center flex={1} w={300} h={300} borderRadius={150} bg={'gray.200'} shadow={1} >
              {dataInputs.bookImage !== '' && dataInputs.bookImage !== undefined ? <Image w={300} h={300} resizeMode={'cover'} borderRadius={150} alt="Imagem Livro" source={{ uri: dataInputs.bookImage }} fallbackSource={require('../assets/noPhoto.png')} /> : <Ionicons name="person-outline" size={140} color="black" />}
            </Center>
          </Center>

          <Center flex={1} flexDir={'row'} marginY={2} justifyContent={'space-around'}>
            <ButtonContained leftIcon={<Icon as={Ionicons} name="md-camera-outline" size="md" color={'white'} mr={1} />} w={110} title={'Camera'} onPress={() => openCamera()} />
            <ButtonContained leftIcon={<Icon as={Ionicons} name="albums-outline" size="md" color={'white'} mr={1} />} w={110} title={'Galeria'} onPress={() => showImagePicker()} />
            <ButtonContained leftIcon={<Icon as={Ionicons} name="md-trash-outline" size="md" color={'white'} mr={1} />} w={110} title={'Remover'} onPress={() => setDataInputs({ ...dataInputs, bookImage: '' })} />
          </Center>
          {'bookImage' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookImage}</FormControl.ErrorMessage> : <FormControl.HelperText>(Selecione uma imagem da galeria)</FormControl.HelperText>}

        </FormControl>


        <FormControl isRequired isInvalid={'registration' in errors} mb={2}>
          <FormControl.Label _text={{ bold: true }}>Matricula</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, registration: value })} />
          {'registration' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.registration}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isRequired isInvalid={'name' in errors} mb={4}>
          <FormControl.Label _text={{ bold: true }}>Nome</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, name: value })} />
          {'name' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.name}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isRequired isInvalid={'lastName' in errors} mb={2}>
          <FormControl.Label _text={{ bold: true }}>Sobrenome</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, lastName: value })} />
          {'lastName' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.lastName}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isInvalid={'email' in errors} mb={2}>
          <FormControl.Label _text={{ bold: true }}>E-mail</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, email: value })} />
          {'email' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.email}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isInvalid={'phoneNumber' in errors} mb={4}>
          <FormControl.Label _text={{ bold: true }}>Celular</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, phoneNumber: value })} />
          {'phoneNumber' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.phoneNumber}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isRequired isInvalid={'acessGroup' in errors} mb={5}>
          <FormControl.Label _text={{ bold: true }}>Tipo de Usuário</FormControl.Label>
          <Select selectedValue={dataInputs.acessGroup} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" bgColor="gray.300" shadow={1} placeholderTextColor={"gray.600"} placeholder=""
            _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, acessGroup: value })}>
            <Select.Item label="Admin" value="Admin" />
            <Select.Item label="Professor" value="Professor" />
            <Select.Item label="Aluno" value="Aluno" />
          </Select>
          {'acessGroup' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.acessGroup}</FormControl.ErrorMessage> : <FormControl.HelperText>(Usuários Admin/Professor tem acesso total ao APP, enquanto o aluno apenas consegue vizualizar os livros e seus empréstimos ativos)</FormControl.HelperText>}
        </FormControl>

        <Divider />
        <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
          <ButtonContained w={'30%'} title={'Cadastrar'} onPress={(registerUser)} colorScheme="cyan" />
        </Box>
      </ScrollView>

    </VStack>
  );
}
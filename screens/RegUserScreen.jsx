import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, useToast, Center, Image, Row, Heading, useColorModeValue } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons } from "@expo/vector-icons";
import { URL_API_BACK_END } from '@env';

import * as ImagePicker from 'expo-image-picker';
import { ToastAlert } from '../components/ToastAlert';
import { Buffer } from "buffer";

export function RegUserScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const [dataInputs, setDataInputs] = useState({
    registration: null,
    name: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    acessGroup: 'Aluno',
    userImage: null
  });
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [doc, setDoc] = useState();
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  async function setUser() {
    await fetch(URL_API_BACK_END + 'users', {
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
        userImage: dataInputs.userImage == null ? null : toBase64(dataInputs.userImage)
      })
    }).then(() => {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Sucesso"} status={'success'} description={"Usuário cadastrado com sucesso!"} varToast={toast} />
          }
        });
      };
    })
  }

  function toBase64(input) {
    return Buffer.from(input, 'utf-8').toString('base64')
  }

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Acesso Negado"} status={'error'} description={"Você recusou que este aplicativo acesse suas fotos!"} varToast={toast} />
          }
        });
      }
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, userImage: result.assets[0].uri });
    }
  }


  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted !== false) {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Acesso Negado"} status={'error'} description={"Você recusou que este aplicativo use sua câmera!"} varToast={toast} />
          }
        });
      }
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, });
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, userImage: result.assets[0].uri });
    }
  }

  const validate = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key];
    })
    if (dataInputs.registration == null) {
      setErrors(Object.assign(errors, { registration: 'A matrícula é obrigatória' }));
    } else if (!Number.isInteger(Number(dataInputs.registration))) {
      setErrors(Object.assign(errors, { registration: 'Somente números são aceitos na matrícula' }));
    } else if (dataInputs.registration.length > 11) {
      setErrors(Object.assign(errors, { registration: 'A matrícula informado é muito grande (Máx. 11)' }));
    }
    if (dataInputs.name == null) {
      setErrors(Object.assign(errors, { name: 'O nome é obrigatório' }));
    }
    if (dataInputs.lastName == null) {
      setErrors(Object.assign(errors, { lastName: 'O sobrenome é obrigatório' }));
    }
    if (dataInputs.acessGroup == null) {
      setErrors(Object.assign(errors, { acessGroup: 'O tipo de usuário é obrigatório' }));
    }
    return Object.values(errors).length == 0 ? true : false;
  };

  async function registerUser() {
    setIsLoadingButton(true);
    if (validate()) {
      await setUser();
      setDataInputs({
        registration: null,
        name: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        acessGroup: 'Aluno',
        userImage: null
      });
    } else {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Erro ao cadastrar"} status={'error'} description={"A validação de um ou mais campos falhou, revise todas as informações e tente novamente!"} varToast={toast} />
          }
        });
      }
    }
    setIsLoadingButton(false);
  };

  return (
    <Box flex={1} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack marginX={3}/* maxW="300px" */>
          <FormControl isInvalid={'userImage' in errors} mb={4} mt={2}>

            <Center flex={1} >
              <Center flex={1} w={300} h={300} borderRadius={150} _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} >
                {dataInputs.userImage !== null && dataInputs.userImage !== undefined ? <Image w={300} h={300} resizeMode={'cover'} borderRadius={150} alt="Imagem Livro" source={{ uri: dataInputs.userImage }} fallbackSource={require('../assets/noPhoto.png')} /> : <Ionicons name="person-outline" size={140} color={useColorModeValue('black', 'gray')} />}
              </Center>
            </Center>

            <Center flex={1} flexDir={'row'} marginY={2} justifyContent={'space-around'}>
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-camera-outline" size="md" color={'white'} mr={1} />} w={110} title={'Camera'} onPress={() => openCamera()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="albums-outline" size="md" color={'white'} mr={1} />} w={110} title={'Galeria'} onPress={() => showImagePicker()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-trash-outline" size="md" color={'white'} mr={1} />} w={110} title={'Remover'} onPress={() => setDataInputs({ ...dataInputs, userImage: null })} />
            </Center>
            {'userImage' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.userImage}</FormControl.ErrorMessage> : <FormControl.HelperText>(Selecione uma imagem da galeria)</FormControl.HelperText>}

          </FormControl>


          <FormControl isRequired isInvalid={'registration' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Matricula</FormControl.Label>
            <InputField placeholder="" keyboardType='numeric' onChangeText={value => setDataInputs({ ...dataInputs, registration: value })} value={dataInputs.registration} />
            {'registration' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.registration}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'name' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Nome</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, name: value })} value={dataInputs.name} />
            {'name' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.name}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'lastName' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Sobrenome</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, lastName: value })} value={dataInputs.lastName} />
            {'lastName' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.lastName}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'email' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>E-mail</FormControl.Label>
            <InputField placeholder="" keyboardType='email-address' onChangeText={value => setDataInputs({ ...dataInputs, email: value })} value={dataInputs.email} />
            {'email' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.email}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'phoneNumber' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Celular</FormControl.Label>
            <InputField placeholder="" keyboardType='numeric' onChangeText={value => setDataInputs({ ...dataInputs, phoneNumber: value })} value={dataInputs.phoneNumber} />
            {'phoneNumber' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.phoneNumber}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'acessGroup' in errors} mb={5}>
            <FormControl.Label _text={{ bold: true }}>Tipo de Usuário</FormControl.Label>
            <Select selectedValue={dataInputs.acessGroup} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} placeholderTextColor={"gray.600"} placeholder=""
              _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, acessGroup: value })} value={dataInputs.acessGroup}>
              <Select.Item label="Admin" value="Admin" />
              <Select.Item label="Professor" value="Professor" />
              <Select.Item label="Aluno" value="Aluno" />
            </Select>
            {'acessGroup' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.acessGroup}</FormControl.ErrorMessage> : <FormControl.HelperText>(Usuários Admin/Professor tem acesso total ao APP, enquanto o aluno apenas consegue vizualizar os livros e seus empréstimos ativos)</FormControl.HelperText>}
          </FormControl>

          <Divider />
          <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
            <ButtonContained isLoading={isLoadingButton} w={'30%'} title={'Cadastrar'} onPress={(registerUser)} colorScheme="cyan" />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

import React, { useState, useContext } from 'react';
import { Text } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, Pressable, Center, Image, useColorModeValue, useToast, Hidden } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { URL_API_BACK_END } from '@env';
import { BookValueContext } from '../contexts/RegisterBookContext'
import * as ImagePicker from 'expo-image-picker';
import { ToastAlert } from '../components/ToastAlert';
import { Buffer } from "buffer";

export function RegBooksScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const toastIdRef = React.useRef();
  const { dataInputs, setDataInputs } = useContext(BookValueContext);
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  async function setBooks() {
    await fetch(URL_API_BACK_END + 'books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        internalCode: parseInt(dataInputs.internalCode, 10),
        isbn: dataInputs.isbn,
        title: dataInputs.title,
        subtitle: dataInputs.subtitle,
        genre: dataInputs.genre,
        volume: dataInputs.volume,
        edition: dataInputs.edition,
        collection: dataInputs.collection,
        language: dataInputs.language,
        synopsis: dataInputs.synopsis,
        originCountry: dataInputs.originCountry,
        author: dataInputs.author,
        authorLastName: dataInputs.authorLastName,
        publishingCompany: dataInputs.publishingCompany,
        publishDate: new Date(dataInputs.publishDate),
        pages: parseInt(dataInputs.pages, 10),
        ageGroup: parseInt(dataInputs.ageGroup, 10),
        userImage: dataInputs.bookImage == null ? null : toBase64(dataInputs.bookImage),
        bookSituation: dataInputs.bookSituation
      })
      /*bookImage: dataInputs.bookImage */,
    }).then(() => {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Sucesso"} status={'success'} description={"Livro cadastrado com sucesso!"} varToast={toast} />
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
            return <ToastAlert id={id} title={"Acesso Negado"} status={'error'} description={"Voc?? recusou que este aplicativo acesse suas fotos!"} varToast={toast} />
          }
        });
      }
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false
    });
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, bookImage: result.assets[0].uri });
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Acesso Negado"} status={'error'} description={"Voc?? recusou que este aplicativo use sua c??mera!"} varToast={toast} />
          }
        });
      }
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, });
    if (!result.canceled) {
      setDataInputs({ ...dataInputs, bookImage: result.assets[0].uri });
    }
  }


  const validate = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key];
    })
    if (dataInputs.internalCode !== null) {
      if (!Number.isInteger(Number(dataInputs.internalCode))) {
        setErrors(Object.assign(errors, { internalCode: 'Somente n??meros s??o aceitos no c??digo interno' }));
      } else if (dataInputs.internalCode.length > 11) {
        setErrors(Object.assign(errors, { internalCode: 'O c??digo interno informado ?? muito grande (M??x. 11)' }));
      }
    }
    if (dataInputs.title == null) {
      setErrors(Object.assign(errors, { title: 'O t??tulo ?? obrigat??rio' }));
    }

    if (dataInputs.pages !== null) {
      if (!Number.isInteger(Number(dataInputs.pages))) {
        setErrors(Object.assign(errors, { pages: 'Somente n??meros s??o aceitos na quantidade de p??ginas' }));
      }
    }

    if (dataInputs.ageGroup !== null) {
      if (!Number.isInteger(Number(dataInputs.ageGroup))) {
        setErrors(Object.assign(errors, { ageGroup: 'Somente n??meros s??o aceitos na classifica????o indicativa' }));
      }
    }
    return Object.values(errors).length == 0 ? true : false;
  };

  async function registerBook() {
    setIsLoadingButton(true)
    if (validate()) {
      await setBooks();
      setDataInputs({
        internalCode: null,
        isbn: null,
        title: null,
        subtitle: null,
        genre: null,
        volume: null,
        edition: null,
        collection: null,
        language: null,
        synopsis: null,
        originCountry: null,
        author: null,
        authorLastName: null,
        publishingCompany: null,
        publishDate: null,
        pages: null,
        ageGroup: null,
        bookImage: null,
        bookSituation: 'Livre'
      });
    } else {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Erro ao cadastrar"} status={'error'} description={"A valida????o de um ou mais campos falhou, revise todas as informa????es e tente novamente!"} varToast={toast} />
          }
        });
      }
    }
    setIsLoadingButton(false)
  };
  return (
    <Box flex={1} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
      <VStack marginX={3} /* maxW="300px" */>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isInvalid={'bookImage' in errors} mb={4} mt={2}>

            <Center flex={1} >
              <Center flex={1} w={155} h={225} borderRadius={10} _light={{ bgColor: 'gray.200' }} _dark={{ bgColor: 'dark.100' }} shadow={1} >
                {dataInputs.bookImage !== null && dataInputs.bookImage !== undefined ? <Image w={155} h={225} resizeMode={'cover'} borderRadius={10} alt="Imagem Livro" source={{ uri: dataInputs.bookImage }} fallbackSource={require('../assets/noPhoto.png')} /> : <FontAwesome name="book" size={100} color={useColorModeValue('black', 'gray')} />}
              </Center>
            </Center>

            <Center flex={1} flexDir={'row'} marginY={2} justifyContent={'space-around'}>
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-camera-outline" size="md" color={'white'} mr={1} />} w={110} title={'Camera'} onPress={() => openCamera()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="albums-outline" size="md" color={'white'} mr={1} />} w={110} title={'Galeria'} onPress={() => showImagePicker()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-trash-outline" size="md" color={'white'} mr={1} />} w={110} title={'Remover'} onPress={() => setDataInputs({ ...dataInputs, bookImage: null })} />
            </Center>
            {'bookImage' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookImage}</FormControl.ErrorMessage> : <FormControl.HelperText>(Selecione uma imagem da galeria)</FormControl.HelperText>}

          </FormControl>


          <FormControl isInvalid={'internalCode' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>C??digo Interno</FormControl.Label>
            <InputField placeholder="" keyboardType='numeric' onChangeText={value => setDataInputs({ ...dataInputs, internalCode: value })} value={dataInputs.internalCode} />
            {'internalCode' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.internalCode}</FormControl.ErrorMessage> : <FormControl.HelperText>(Caso n??o informado ser?? gerado um automaticamente)</FormControl.HelperText>}
          </FormControl>

          <FormControl isInvalid={'isbn' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>ISBN</FormControl.Label>
            <InputField placeholder="" keyboardType='numeric' onChangeText={value => setDataInputs({ ...dataInputs, isbn: value })} value={dataInputs.isbn} InputRightElement={<Pressable onPress={() => navigation.navigate('Leitor C??digo Barras')}><Icon mr={2} size={'xl'} /*_light={{ color: 'gray.400' }} _dark={{ color: 'dark.200' }}*/ color="gray.400" as={<Ionicons name="barcode-outline" />} /></Pressable>} />

            {'isbn' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.isbn}</FormControl.ErrorMessage> : <FormControl.HelperText>(Ao informar um ISBN todos os dados ser??o substituidos automaticamente)</FormControl.HelperText>}
          </FormControl>

          <FormControl isRequired isInvalid={'title' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>T??tulo</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, title: value })} value={dataInputs.title} />
            {'title' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.title}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'subtitle' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Subt??tulo</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, subtitle: value })} value={dataInputs.subtitle} />
            {'subtitle' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.subtitle}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'genre' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Categorias</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, genre: value })} value={dataInputs.genre} />
            {'genre' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.genre}</FormControl.ErrorMessage> : <FormControl.HelperText> (Informe os valores separado por virgula e espa??os){ } Ex: Hist??ria,Fic????o,Aventura)</FormControl.HelperText>}
          </FormControl>

          <FormControl isInvalid={'volume' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Volume</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, volume: value })} value={dataInputs.volume} />
            {'volume' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.volume}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'edition' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Edi????o</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, edition: value })} value={dataInputs.edition} />
            {'edition' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.edition}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'collection' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Cole????o</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, collection: value })} value={dataInputs.collection} />
            {'collection' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.collection}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'language' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Idioma</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, language: value })} value={dataInputs.language} />
            {'language' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.language}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'synopsis' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Sinopse</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, synopsis: value })} value={dataInputs.synopsis} />
            {'synopsis' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.synopsis}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'originCountry' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Pa??s de Origem</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, originCountry: value })} value={dataInputs.originCountry} />
            {'originCountry' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.originCountry}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'author' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Nome do Autor</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, author: value })} value={dataInputs.author} />
            {'author' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.author}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'authorLastName' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Sobrenome do Autor</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, authorLastName: value })} value={dataInputs.authorLastName} />
            {'authorLastName' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.authorLastName}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'publishingCompany' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Editora</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, publishingCompany: value })} value={dataInputs.publishingCompany} />
            {'publishingCompany' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.publishingCompany}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'publishDate' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Data de Publica????o</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, publishDate: value })} value={dataInputs.publishDate} />
            {'publishDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.publishDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'pages' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Quantidade de P??ginas</FormControl.Label>
            <InputField placeholder="" keyboardType='numeric' onChangeText={value => setDataInputs({ ...dataInputs, pages: value })} value={dataInputs.pages} />
            {'pages' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.pages}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'ageGroup' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Classifica????o Indicativa</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, ageGroup: value })} value={dataInputs.ageGroup} />
            {'ageGroup' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.ageGroup}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'bookSituation' in errors} mb={5}>
            <FormControl.Label _text={{ bold: true }}>Disponibilidade</FormControl.Label>
            <Select selectedValue={dataInputs.bookSituation} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} placeholderTextColor={"gray.600"} placeholder=""
              _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, bookSituation: value })} value={dataInputs.bookSituation}>
              <Select.Item label="Livre" value="Livre" />
              <Select.Item label="Emprestado" value="Emprestado" />
              <Select.Item label="Perdido" value="Perdido" />
              <Select.Item label="Extraviado" value="Extraviado" />
            </Select>
            {'bookSituation' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookSituation}</FormControl.ErrorMessage> : <FormControl.HelperText> (Somente ser?? possivel emprestar livros que estejam 'Livres')</FormControl.HelperText>}
          </FormControl>

          <Divider />
          <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
            <ButtonContained isLoading={isLoadingButton} w={'30%'} title={'Cadastrar'} onPress={(registerBook)} colorScheme="cyan" />
          </Box>
        </ScrollView>

      </VStack>
    </Box>
  );
}

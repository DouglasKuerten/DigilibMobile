import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { ViewBooksScreen } from '../views/ViewBooksScreen';
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, Pressable, Center, Image, Row, Heading, useColorModeValue } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ReadBarcode } from './ReadBarcode';
import { URL_API_BACK_END } from '@env';
import { BookValueContext } from '../contexts/RegisterBookContext'
import * as ImagePicker from 'expo-image-picker';


export function RegBooksScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  /* const [dataInputs, setDataInputs] = useState({}); */
  const { dataInputs, setDataInputs } = useContext(BookValueContext);

  async function setBooks() {
    console.log("Exec")
    let reqs = await fetch(URL_API_BACK_END + 'books', {
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
        bookImage: "",
        bookSituation: dataInputs.bookSituation
      })
      /*bookImage: dataInputs.bookImage */,
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
      allowsMultipleSelection: false
    });
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
    if (dataInputs.internalCode !== undefined) {
      if (!Number.isInteger(Number(dataInputs.internalCode))) {
        setErrors({ ...errors, internalCode: 'Somente números são aceitos no código interno' });
        return false;
      } else if (dataInputs.internalCode.length > 11) {
        setErrors({ ...errors, internalCode: 'O código interno informado é muito grande (Máx. 11)' });
        return false;
      }
    }

    if (dataInputs.title == undefined) {
      setErrors({ ...errors, title: 'O título é obrigatório' });
      return false;
    }

    if (dataInputs.pages !== undefined) {
      if (!Number.isInteger(Number(dataInputs.pages))) {
        setErrors({ ...errors, pages: 'Somente números são aceitos na quantidade de páginas' });
        return false;
      }
    }

    if (dataInputs.ageGroup !== undefined) {
      if (!Number.isInteger(Number(dataInputs.ageGroup))) {
        setErrors({ ...errors, ageGroup: 'Somente números são aceitos na classificação indicativa' });
        return false;
      }
    }

    setErrors({});
    return true;
  };

  const registerBook = () => {
    if (validate()) {
      setBooks()
      setDataInputs({})
    } else {
      alert('Erro ao inserir, validação falhou');
    }
  };
  return (
    <Box flex={1} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
      <VStack marginX={3} /* maxW="300px" */>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isInvalid={'bookImage' in errors} mb={4} mt={2}>

            <Center flex={1} >
              <Center flex={1} w={155} h={225} borderRadius={10} _light={{ bgColor: 'gray.200' }} _dark={{ bgColor: 'dark.100' }} shadow={1} >
                {dataInputs.bookImage !== '' && dataInputs.bookImage !== undefined ? <Image w={180} h={300} resizeMode={'cover'} borderRadius={10} alt="Imagem Livro" source={{ uri: dataInputs.bookImage }} fallbackSource={require('../assets/noPhoto.png')} /> : <FontAwesome name="book" size={100} color={useColorModeValue('black', 'gray')} />}
              </Center>
            </Center>

            <Center flex={1} flexDir={'row'} marginY={2} justifyContent={'space-around'}>
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-camera-outline" size="md" color={'white'} mr={1} />} w={110} title={'Camera'} onPress={() => openCamera()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="albums-outline" size="md" color={'white'} mr={1} />} w={110} title={'Galeria'} onPress={() => showImagePicker()} />
              <ButtonContained leftIcon={<Icon as={Ionicons} name="md-trash-outline" size="md" color={'white'} mr={1} />} w={110} title={'Remover'} onPress={() => setDataInputs({ ...dataInputs, bookImage: '' })} />
            </Center>
            {'bookImage' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookImage}</FormControl.ErrorMessage> : <FormControl.HelperText>(Selecione uma imagem da galeria)</FormControl.HelperText>}

          </FormControl>


          <FormControl isInvalid={'internalCode' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Código Interno</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, internalCode: value })} value={dataInputs.internalCode} />
            {'internalCode' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.internalCode}</FormControl.ErrorMessage> : <FormControl.HelperText>(Caso não informado será gerado um automaticamente)</FormControl.HelperText>}
          </FormControl>

          <FormControl isInvalid={'isbn' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>ISBN</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, isbn: value })} value={dataInputs.isbn} InputRightElement={<Pressable onPress={() => navigation.navigate('Leitor Código Barras')}><Icon mr={2} size={'xl'} /*_light={{ color: 'gray.400' }} _dark={{ color: 'dark.200' }}*/ color="gray.400" as={<Ionicons name="barcode-outline" />} /></Pressable>} />

            {'isbn' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.isbn}</FormControl.ErrorMessage> : <FormControl.HelperText>(Ao informar um ISBN todos os dados serão substituidos automaticamente)</FormControl.HelperText>}
          </FormControl>

          <FormControl isRequired isInvalid={'title' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Título</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, title: value })} value={dataInputs.title} />
            {'title' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.title}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'subtitle' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Subtítulo</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, subtitle: value })} value={dataInputs.subtitle} />
            {'subtitle' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.subtitle}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'genre' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Categorias</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, genre: value })} value={dataInputs.genre} />
            {'genre' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.genre}</FormControl.ErrorMessage> : <FormControl.HelperText> (Informe os valores separado por virgula e espaços){ } Ex: História, Ficção, Aventura)</FormControl.HelperText>}
          </FormControl>

          <FormControl isInvalid={'volume' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Volume</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, volume: value })} value={dataInputs.volume} />
            {'volume' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.volume}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'edition' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Edição</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, edition: value })} value={dataInputs.edition} />
            {'edition' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.edition}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'collection' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Coleção</FormControl.Label>
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
            <FormControl.Label _text={{ bold: true }}>País de Origem</FormControl.Label>
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
            <FormControl.Label _text={{ bold: true }}>Data de Publicação</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, publishDate: value })} value={dataInputs.publishDate} />
            {'publishDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.publishDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'pages' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Quantidade de Páginas</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, pages: value })} value={dataInputs.pages} />
            {'pages' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.pages}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'ageGroup' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Classificação Indicativa</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, ageGroup: value })} value={dataInputs.ageGroup} />
            {'ageGroup' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.ageGroup}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'bookSituation' in errors} mb={5}>
            <FormControl.Label _text={{ bold: true }}>Disponibilidade</FormControl.Label>
            <Select selectedValue={dataInputs.bookSituation} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} placeholderTextColor={"gray.600"} placeholder=""
              _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, bookSituation: value })}>
              <Select.Item label="Livre" value="Livre" />
              <Select.Item label="Emprestado" value="Emprestado" />
              <Select.Item label="Perdido" value="Perdido" />
              <Select.Item label="Extraviado" value="Extraviado" />
            </Select>
            {'bookSituation' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookSituation}</FormControl.ErrorMessage> : <FormControl.HelperText> (Somente será possivel emprestar livros que estejam 'Livres')</FormControl.HelperText>}
          </FormControl>

          <Divider />
          <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
            <ButtonContained w={'30%'} title={'Cadastrar'} onPress={(registerBook)} colorScheme="cyan" />
          </Box>
        </ScrollView>

      </VStack>
    </Box>
  );
}
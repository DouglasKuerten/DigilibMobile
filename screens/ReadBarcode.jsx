import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Box, Row, CheckIcon, ScrollView, Text, Icon, Divider, IconButton, Center, Heading } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BookValueContext } from '../contexts/RegisterBookContext'

export function ReadBarcode({ navigation }) {
    const [errors, setErrors] = useState({});
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [codeScan, setCodeScan] = useState('');
    const [dataBook, setDataBook] = useState([]);

    const { dataInputs, setDataInputs } = useContext(BookValueContext);

    const getBookInfos = async (isbn) => {
        try {
            const response = await fetch(`https://api.mercadoeditorial.org/api/v1.2/book?isbn=${isbn}`);
            const jsonRes = await response.json();
            setDataBook(jsonRes)
            /*  console.log(jsonRes.books[0]) */
            console.log(dataBook)
        } catch (error) {
            // console.error(error);
        } finally {
            //setLoading(false);
        }
    }

    function setValuesInputs() {
        if (dataBook.books !== undefined) {
            const book = dataBook.books[0];
            const jsonBook = {
                internalCode: '',
                isbn: book.isbn,
                title: book.titulo,
                subtitle: book.subtitulo,
                genre: book.catalogacao.palavras_chave,
                volume: book.volume,
                edition: book.edicao,
                collection: book.colecao,
                language: book.idioma,
                synopsis: book.sinopse,
                originCountry: book.origem,
                author: book.contribuicao[0].nome,
                authorLastName: book.contribuicao[0].sobrenome,
                publishingCompany: book.editora.nome_fantasia,
                publishDate: book.data_publicacao,
                pages: book.medidas.paginas,
                ageGroup: book.faixa_etaria,
                bookImage: book.imagens.imagem_primeira_capa.pequena,
                bookSituation: 'Livre'
            }
            setDataInputs(jsonBook);
            navigation.goBack();
        } else {
            alert('Livro não encontrado')
        }
    }

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setCodeScan(data);
        console.log('Type ' + type + '\nData: ' + data)
        getBookInfos(data);
        setTimeout(() => { setScanned(false) }, 50000);
    }

    if (hasPermission === null) {
        return <Text>Permissão Pendente</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem Permissão</Text>;
    }

    return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Heading size={'xs'} textAlign={'center'} marginX={4} marginY={6} color={'white'}>Aponte a camera para código ISBN do livro para trazer todos os campos preenchidos automaticamente</Heading>
            <Center flex={1}>
                <Center flex={2} w={'100%'}>
                    <Center flex={1} w={'100%'}>
                        <Box w={'100%'} h={'100%'} position={'absolute'} bg={'black'} opacity={0.4} />
                        <Heading size={'xl'} color={'white'} textAlign={'center'} marginY={5}>{'ISBN'}</Heading>
                    </Center>
                    <Center flex={2} w={'100%'} alignItems={'center'}>
                        <Box w={'100%'} h={'100%'} position={'absolute'} flexDir={'row'} opacity={0.4}>
                            <Box w={'5%'} h={'100%'} bg={'black'} />
                            <Box w={'90%'} h={'100%'} flexDir={'column'}>
                                <Box w={'100%'} h={'33.3333%'} bg={'black'} />
                                <Box w={'100%'} h={'33.3333%'} />
                                <Box w={'100%'} h={'33.3333%'} bg={'black'} />
                            </Box>
                            <Box w={'5%'} h={'100%'} bg={'black'} />
                        </Box>
                        <Box w={'90%'} h={'33.3333%'} />
                    </Center>
                </Center>
                <Box flex={1} w={'100%'} alignItems={'center'}>
                    <Box w={'100%'} h={'100%'} position={'absolute'} bg={'black'} opacity={0.4} />
                    <Heading size={'xl'} color={'white'} textAlign={'center'} ellipsizeMode={'tail'} mt={5}>{codeScan + '\n' + (dataBook.status !== undefined ? (dataBook.status.success ? dataBook.books[0].titulo : 'Livro não encontrado') : '')}</Heading>
                    <Text color={'white'}>{dataBook.status !== undefined ? dataBook.status.success ? '' : '(Cadastre o livro manualmente)' : ''}</Text>
                    <Row w={'100%'} mb={4} justifyContent={'space-around'}>
                        <IconButton mt={5} icon={<Icon as={MaterialCommunityIcons} size="9" name="check" />} _icon={{ color: "white", size: "md" }} bg={"green.400"} w={55} h={55} borderRadius={30} onPress={() => setValuesInputs()} />
                        <IconButton mt={5} icon={<Icon as={MaterialCommunityIcons} size="9" name="window-close" />} _icon={{ color: "white", size: "md" }} bg={"red.500"} w={55} h={55} borderRadius={30} onPress={() => navigation.goBack()} />
                    </Row>
                </Box>
            </Center>
        </BarCodeScanner >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202124',
        position: 'absolute',
        height: '109%',
        width: '100%',
    }
});
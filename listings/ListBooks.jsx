import React, { useState, useContext } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Actionsheet, useDisclose, Box, Heading, Text, Icon, ScrollView, IconButton, Center, Pressable, Image, Row, Modal, Divider } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"
import { ButtonUnderline } from "../components/ButtonUnderline"
import { DetailsBook } from "./DetailsBook";
import { Buffer } from "buffer";
import { DetailsReserve } from "./DetailsReserve";

const BookWithInformation = ({ dbValues, onPress }) => (
    <Box marginX={4} marginY={1.5}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', maxHeight: 144 }} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri:'data:image/jpeg;base64,' + fromBase64(dbValues.bookImage) }} alt={"Foto Livro"} resizeMode={'cover'} w={'100'} h={'150'} borderRadius={'10'} />
            <Box flex={1} marginX={2}>
                <Heading ellipsizeMode={'tail'} numberOfLines={1} text size={'lg'} _light={{ color: 'black' }} _dark={{ color: 'white' }}>{dbValues.title}</Heading>
                <Heading size={'sm'} color={'gray.500'}>{`${dbValues.author !== null ? dbValues.author : ' '} ${dbValues.authorLastName !== null ? dbValues.authorLastName : ' '}`}</Heading>
                <Row marginY={2}>
                    <Icon as={<AntDesign name="copy1" />} />
                    <Text paddingX={1} color={'gray.500'}>{dbValues.pages}</Text>
                    <Icon as={<MaterialIcons name="language" />} />
                    <Text paddingX={1} color={'gray.500'}>{dbValues.language}</Text>
                </Row>
                <Row>
                    {
                        dbValues.genre !== undefined && dbValues.genre !== null ?
                            dbValues.genre.split(',').map((gen, index) => {
                                return (
                                    < Center key={index} _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} borderRadius={10} marginRight={2} paddingX={3} paddingY={2} marginY={0.5} >
                                        <Text _light={{ color: 'white' }} _dark={{ color: 'darkBlue.400' }} >{gen.charAt(0).toUpperCase() + gen.slice(1)}</Text>
                                    </Center>)
                            }) : null

                    }
                </Row>
            </Box>
        </TouchableOpacity >
    </Box >
);

function fromBase64(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8')
}

const BookOnlyPhoto = ({ dbValues, onPress }) => (
    <Box mr={2} marginY={1.5} >
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', maxHeight: 225 }} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri:'data:image/png;base64,' + fromBase64(dbValues.Book.bookImage) }} alt={"Foto Livro"} resizeMode={'cover'} w={'150'} h={'225'} borderRadius={'10'}></Image>
        </TouchableOpacity >
    </Box >
);

export function ListBooks(props/* , { navigation } */) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataBookModal, setDataBookModal] = useState([]);
    const [dataReserveModal, setDataReserveModal] = useState([]);

    function openDetails(item, type) {
        onOpen();
        if (type === 'BOOK') {
            setDataReserveModal([])
            setDataBookModal(item);
        }
        else if (type === 'RESERVE') {
            setDataBookModal([]);
            setDataReserveModal(item)
        }
    }
    const renderAllBooks = ({ item }) => <BookWithInformation dbValues={item} onPress={() => openDetails(item, 'BOOK')} />;
    const renderMyBooks = ({ item }) => <BookOnlyPhoto dbValues={item} onPress={() => openDetails(item, 'RESERVE')} />;

    function HeaderMyBooks() {
        return (
            <Box flexDir={'row'} paddingX={4} justifyContent={'space-between'} alignItems={'center'} pt={2}>
                <Heading size={'lg'}>Meus Livros</Heading>
            </Box>
        );
    };
    function MyBooks() {
        return (
            <Box >
                <HeaderMyBooks />
                <Box h={240} ml={4}>
                    <FlatList
                        data={props.dataMyBooks}
                        renderItem={renderMyBooks}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                </Box>
                <Divider orientation="horizontal" mt={4} mb={2} />
            </Box>
        );
    };


    function HeaderAllBooks() {
        return (
            <Box flexDir={'row'} paddingX={4} justifyContent={'space-between'} alignItems={'center'} pt={2}>
                <Heading size={'lg'}>Todos Livros</Heading>
            </Box>
        );
    };
    function EmptyAllBooks() {
        return (
            <Box flex={1} paddingX={4} justifyContent={'center'} alignItems={'center'} pt={2} >
                <Heading size={'md'}>Nenhum livro encontrado</Heading>
            </Box>
        );
    };
    function AllBooks() {
        return (
            <Box flex={1}>
                <HeaderAllBooks />
                <FlatList
                    data={props.dataAllBooks}
                    renderItem={renderAllBooks}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={EmptyAllBooks}
                //ListHeaderComponent={HeaderAllBooks}
                />
            </Box>
        );
    }

    return (
        <Box flex={1} mb={1} justifyContent={'space-around'} >
            {userToken !== null ? <MyBooks /> : null}
            <AllBooks />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */ >
                <Actionsheet.Content _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }}  >
                    {dataBookModal.length !== 0 ? <Box h={'100%'}><DetailsBook dbValues={dataBookModal} /></Box> : <Box h={240}><DetailsReserve dbValues={dataReserveModal} /></Box>}
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );
}

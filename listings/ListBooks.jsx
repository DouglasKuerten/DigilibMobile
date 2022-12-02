import React, { useState, useContext } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Actionsheet, useDisclose, Box, Heading, Text, Icon, ScrollView, IconButton, Center, Pressable, Image, Row, Modal, Divider } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"
import { ButtonUnderline } from "../components/ButtonUnderline"
import { DetailsBook } from "./DetailsBook";
import { Buffer } from "buffer";

const Item = ({ dbValues, onPress }) => (
    <Box marginX={4} marginY={1.5}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', maxHeight: 144 }} onPress={onPress} activeOpacity={0.7}>
            <Image source={require('../assets/noPhoto.png')} alt={"Foto Livro"} resizeMode={'cover'} w={'100'} h={'150'} borderRadius={'10'} />
            {/*  source={dbValues.bookImage !== null ? 'data:image/jpg;base64,' + Buffer.from(dbValues.bookImage.data).toString('base64') : require('../assets/noPhoto.png')} */}
            {/*    source={{ uri: dataInputs.bookImage }} fallbackSource={require('../assets/noPhoto.png') */}
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
                                    < Center key={index} bgColor={'blue.300'} borderRadius={10} marginRight={2} paddingX={3} paddingY={2} marginY={0.5} >
                                        <Text color={'blue.600'} >{gen}</Text>
                                    </Center>)
                            }) : null

                    }
                </Row>
            </Box>
        </TouchableOpacity >
    </Box >
);
const Book = ({ dbValues, onPress }) => (
    <Box mr={2} marginY={1.5} >
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', maxHeight: 225 }} onPress={onPress} activeOpacity={0.7}>
            <Image source={require('../assets/imagemProvisoria.png')/* dbValues.bookImage */} alt={"Foto Livro"} resizeMode={'cover'} w={'150'} h={'225'} borderRadius={'10'}></Image>
        </TouchableOpacity >
    </Box >
);

export function ListBooks(props/* , { navigation } */) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataBookModal, setDataBookModal] = useState([]);

    function openDetails(item) {
        onOpen();
        setDataBookModal(item);

    }
    const renderBooks = ({ item }) => <Item dbValues={item} onPress={() => openDetails(item)} />;
    const renderMyBooks = ({ item }) => <Book dbValues={item} onPress={() => openDetails(item)} />;


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
                        data={props.data}
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
                    data={props.data}
                    renderItem={renderBooks}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={EmptyAllBooks}
                //ListHeaderComponent={HeaderAllBooks}
                />
            </Box>
        );
    }

    return (
        <Box flex={1} mb={1}>
            {userToken !== null ? <MyBooks /> : null}
            <AllBooks />

            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */ >
                <Actionsheet.Content _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} >
                    <Box h={'100%'}>
                        <DetailsBook dbValues={dataBookModal} />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );


    /* 
        const renderItem = ({ item }) => <Item title={item.title} author={item.author} onPress={() => clickItem(item)} />;
    
        const ButtonsManage = () => (
            <Box>
                <IconButton icon={<Icon as={MaterialIcons} size="6" name="delete" />} _icon={{ color: "white", size: "md" }} bg={"red.500"} w={10} h={10} mb={1} />
                <IconButton icon={<Icon as={MaterialIcons} size="6" name="edit" />} _icon={{ color: "white", size: "md" }} bg={"blue.400"} w={10} h={10} />
            </Box>
        )
    
        const FlatListEmpty = () => (
            <Center >
                <Text>Sem dados encontados</Text>
            </Center>
        );
        const HeaderFlatList = () => (
            <Center flexDir={'row'} w={"95%"} alignSelf={'center'} >
            </Center>
        );
    
        return (
            <Box flex={1} justifyContent={"space-around"}>
                <FlatList data={props.data} renderItem={renderItem} keyExtractor={(item) => item.id} ListEmptyComponent={FlatListEmpty()} initialNumToRender={25} ListHeaderComponent={HeaderFlatList()} showsVerticalScrollIndicator={false} />
                <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay >
                    <Actionsheet.Content >
                        <Box w="100%" h={350} px={2}>
                            <Box style={{ flex: 1, flexDirection: 'row' }} maxH={"26%"} justifyContent={"space-around"}>
                                <Image source={require('../assets/noPhoto.png')} style={{ maxHeight: "100%", width: 85 }} />
                                <Box flex={1} flexDir={'column'} pl={1}>
                                    <Text style={{ fontSize: 22 }}>{dataBookModal.title}</Text>
                                    <Text style={{ fontSize: 18 }}>Autor: {dataBookModal.author}</Text>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text>Editora: {dataBookModal.publishingCompany}</Text>
                                        <Text>Publicação: {dataBookModal.productionYear}</Text>
                                        <Text>Categoria: {dataBookModal.category}</Text>
                                    </ScrollView>
                                </Box>
                                {userToken !== null ? <ButtonsManage /> : null}
                            </Box>
    
                            <Box style={{ flexDirection: 'column', justifyContent: "flex-start", alignSelf: 'center', }} pt="2" maxH={"74%"}>
                                <Text style={{ fontSize: 18, textAlign: "center" }}>Resumo do Livro</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{dataBookModal.description}</Text>
                                </ScrollView>
                            </Box>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>
            </Box >
        ); */
}
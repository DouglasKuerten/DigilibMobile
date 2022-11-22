import React, { useState, useContext } from "react";
import { FlatList, View, Image } from "react-native";
import { Actionsheet, useDisclose, Box, Text, Icon, ScrollView, IconButton, Center, Pressable } from "native-base";
import { MaterialIcons, } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"


const Item = ({ name, title, onPress }) => (
    <Pressable style={{ backgroundColor: "#d2d2d2", paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5, borderRadius: 5, alignSelf: "center", alignItems: "center", width: "95%", flexDirection: 'row', height: 60 }} onPress={onPress}>
        <Image source={require('../assets/noPhoto.png')} style={{ height: 35, width: 35, borderRadius: 15 }} />
        <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, paddingLeft: 10, textAlign: "center" }} numberOfLines={1}>{name}</Text>
            <Text style={{ fontSize: 14, paddingLeft: 10, textAlign: "center" }} numberOfLines={1}>{title}</Text>
        </View>
    </Pressable >

);

export function ListReserves(props) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataReservesModal, setDataReservesModal] = useState([]);

    function clickItem(item) {
        onOpen();
        setDataReservesModal(item);
        console.log(dataReservesModal)
    }

    const renderItem = ({ item }) => <Item name={item.User.name} title={item.Book.title} onPress={() => clickItem(item)} />;

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
            {/* Cabecalho da listagem */}
        </Center>
    );

    return (
        <Box flex={1} justifyContent={"space-around"}>
            <FlatList data={props.data} renderItem={renderItem} keyExtractor={(item) => item.id} ListEmptyComponent={FlatListEmpty()} initialNumToRender={25} ListHeaderComponent={HeaderFlatList()} showsVerticalScrollIndicator={false} />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */>
                <Actionsheet.Content >
                    <Box w="100%" h={350} px={2}>
                        <Box style={{ flex: 1, flexDirection: 'row' }} maxH={"26%"} justifyContent={"space-around"}>
                            <Image source={require('../assets/noPhoto.png')} style={{ maxHeight: "100%", width: 85 }}/>
                            <Box flex={1} flexDir={'column'} pl={1}>
                                <Text style={{ fontSize: 22 }}>{dataReservesModal.name}</Text>
                                <Text style={{ fontSize: 18 }}>Autor: {dataReservesModal.title}</Text>
                                 <ScrollView showsVerticalScrollIndicator={false}/* w={"60%"} */>
                                  {/*   <Text>Editora: {dataReservesModal.publishingCompany}</Text>
                                    <Text>Publicação: {dataReservesModal.productionYear}</Text>
                                    <Text>Categoria: {dataReservesModal.category}</Text> */}
                                </ScrollView>
                            </Box>
                            {userToken !== null ? <ButtonsManage /> : null}
                        </Box>

                        <Box style={{ flexDirection: 'column', justifyContent: "flex-start", alignSelf: 'center', }} pt="2" maxH={"74%"}>
                            <Text style={{ fontSize: 18, textAlign: "center" }}>Resumo do Livro</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/*  <Text style={{ fontSize: 16, textAlign: "justify" }}>{dataReservesModal.description}</Text> */}
                                <Text style={{ fontSize: 16, textAlign: "justify" }}>Com ilustrações criativas e texto bem-humorado, Hawking desvenda desde os mistérios da física de partículas até a dinâmica das centenas de milhões de galáxias do universo. Para o iniciado, é uma bela representação de conceitos complexos; para o leigo, é um vislumbre dos segredos mais profundos da criação. Com ilustrações criativas e texto bem-humorado, Hawking desvenda desde os mistérios da física de partículas até a dinâmica das centenas de milhões de galáxias do universo. Para o iniciado, é uma bela representação de conceitos complexos; para o leigo, é um vislumbre dos segredos mais profundos da criação. Com ilustrações criativas e texto bem-humorado, Hawking desvenda desde os mistérios da física de partículas até a dinâmica das centenas de milhões de galáxias do universo. Para o iniciado, é uma bela representação de conceitos complexos; para o leigo, é um vislumbre dos segredos mais profundos da criação.</Text>
                            </ScrollView>
                        </Box>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box >
    );
}
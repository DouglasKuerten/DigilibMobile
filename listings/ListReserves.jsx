import React, { useState, useContext } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Actionsheet, useDisclose, Box, Text, Icon, ScrollView, IconButton, Center, Pressable, Heading, Image } from "native-base";
import { MaterialIcons, } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"
import { ButtonContained } from "../components/ButtonContained";
import moment from 'moment'; import 'moment/locale/pt-br'
import { DetailsReserve } from "./DetailsReserve";
import { Buffer } from "buffer";

/*
const Item = ({ name, title, onPress }) => (
    <Pressable style={{ backgroundColor: "#d2d2d2", paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5, borderRadius: 5, alignSelf: "center", alignItems: "center", width: "95%", flexDirection: 'row', height: 60 }} onPress={onPress}>
        <Image source={require('../assets/noPhoto.png')} style={{ height: 35, width: 35, borderRadius: 15 }} />
        <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 18, paddingLeft: 10, textAlign: "center" }} numberOfLines={1}>{name}</Text>
            <Text style={{ fontSize: 14, paddingLeft: 10, textAlign: "center" }} numberOfLines={1}>{title}</Text>
        </View>
    </Pressable >

);
*/
const Reserve = ({ dbValues, onPress }) => (
    <Box marginX={4} marginY={1.5}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', maxHeight: 144 }} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri: 'data:image/jpeg;base64,' + fromBase64(dbValues.Book.bookImage) }} alt={"Foto Livro"} resizeMode={'cover'} w={'100'} h={'150'} borderRadius={'10'} />
            <Box flex={1} marginX={2}>
                <Heading ellipsizeMode={'tail'} numberOfLines={1} text size={'lg'} _light={{ color: 'black' }} _dark={{ color: 'white' }}>{dbValues.Book.title}</Heading>
                <Text ellipsizeMode={'tail'} numberOfLines={1} fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Usuário: {dbValues.User.name} {dbValues.User.lastName}</Text>
                <Text fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Reserva: {moment(dbValues.reserveDate).locale('pt-BR').format('L')}</Text>
                <Text fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Devolução: {moment(dbValues.returnDate).locale('pt-BR').format('L')}</Text>

                <Center _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} borderRadius={10} mt={1} mb={1} paddingX={3} paddingY={2} maxW={'40%'} >
                    <Text _light={{ color: 'white' }} _dark={{ color: 'darkBlue.400' }} >{dbValues.reserveStatus}</Text>
                </Center>

            </Box>
        </TouchableOpacity >
    </Box >
);

function fromBase64(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8')
}

export function ListReserves(props) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataReservesModal, setDataReservesModal] = useState([]);

    function clickItem(item) {
        onOpen();
        setDataReservesModal(item);
    }

    const renderItem = ({ item }) => <Reserve dbValues={item} onPress={() => clickItem(item)} />;

    const FlatListEmpty = () => (
        <Box flex={1} paddingX={4} justifyContent={'center'} alignItems={'center'} pt={2} >
            <Heading size={'md'}>Nenhuma reserva encontrada</Heading>
        </Box>
    );

    return (
        <Box flex={1} justifyContent={"space-around"} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
            <FlatList data={props.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={FlatListEmpty()}
                initialNumToRender={25}
                showsVerticalScrollIndicator={false} />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */>
                <Actionsheet.Content _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }}>
                    <Box h={240}>
                        <DetailsReserve dbValues={dataReservesModal} />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box >
    );
}

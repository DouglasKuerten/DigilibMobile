import React, { useState, useContext } from "react";
import { FlatList, View, Image } from "react-native";
import { Actionsheet, useDisclose, Box, Text, Icon, Avatar, IconButton, Heading, Center, Pressable } from "native-base";
import { MaterialIcons, } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"
import { DetailsUser } from "./DetailsUser";


const User = ({ name, lastName, occupation, onPress }) => (
    <Pressable style={{ paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5, borderRadius: 5, alignSelf: "center", alignItems: "center", width: "100%", flexDirection: 'row', height: 100 }} onPress={onPress}>
        <Avatar source={require('../assets/elon.png')} size={'20'} />
        <Box style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Heading size={'sm'} pl={3} numberOfLines={1}>{name} {lastName}</Heading>
            <Center _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} borderRadius={10} mt={1} mb={1} paddingX={3} paddingY={2} maxW={'40%'} ml={3}>
                <Text _light={{ color: 'white' }} _dark={{ color: 'darkBlue.400' }} >{occupation}</Text>
            </Center>
        </Box>
    </Pressable >


);

export function ListUsers(props) {
    const { userToken } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclose();
    const [dataUserModal, setdataUserModal] = useState([]);

    function clickItem(item) {
        onOpen();
        setdataUserModal(item);
    }

    const renderUser = ({ item }) => <User name={item.name} occupation={item.acessGroup} lastName={item.lastName} onPress={() => clickItem(item)} />;

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
        <Box flex={1} justifyContent={"space-around"} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
            <FlatList data={props.data} renderItem={renderUser} keyExtractor={(item) => item.id} ListEmptyComponent={FlatListEmpty()} initialNumToRender={25} ListHeaderComponent={HeaderFlatList()} showsVerticalScrollIndicator={false} />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */ >
                <Actionsheet.Content _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} >
                    <Box h={180}>
                        <DetailsUser dbValues={dataUserModal} />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box >
    );
}
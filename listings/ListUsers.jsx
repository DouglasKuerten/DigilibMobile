import React, { useState, useContext } from "react";
import { FlatList, View, Image } from "react-native";
import { Actionsheet, useDisclose, Box, Text, Icon, ScrollView, IconButton, Heading, Center, Pressable } from "native-base";
import { MaterialIcons, } from "@expo/vector-icons";
import { AuthContext } from "../navigation/AuthContext"
import { DetailsUser } from "./DetailsUser";


const Item = ({ name, occupation, onPress }) => (
    <Pressable style={{ paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5, borderRadius: 5, alignSelf: "center", alignItems: "center", width: "100%", flexDirection: 'row', height: 60 }} onPress={onPress}>
        <Image source={require('../assets/elon.png')} style={{ height: 50, width: 50, borderRadius: 25 }} />
        <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Heading size={'sm'} pl={3} numberOfLines={1}>{name}</Heading>
            <Text fontSize={12} pl={3} numberOfLines={1}>{occupation}</Text>
        </View>
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

    const renderItem = ({ item }) => <Item name={item.name} occupation={item.acessGroup} onPress={() => clickItem(item)} />;

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
        <Box flex={1} justifyContent={"space-around"} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
            <FlatList data={props.data} renderItem={renderItem} keyExtractor={(item) => item.id} ListEmptyComponent={FlatListEmpty()} initialNumToRender={25} ListHeaderComponent={HeaderFlatList()} showsVerticalScrollIndicator={false} />
            <Actionsheet isOpen={isOpen} onClose={onClose} /* disableOverlay */ >
                <Actionsheet.Content _light={{ bgColor: 'gray.700' }} _dark={{ bgColor: 'dark.100' }} >
                    <Box h={260}>
                        <DetailsUser dbValues={dataUserModal} />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </Box >
    );
}
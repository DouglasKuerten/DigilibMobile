import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, Column, Row } from "native-base";
import { ListUsers } from '../listings/ListUsers';
import { MaterialIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import { URL_API_BACK_END } from '@env';
import { useColorModeValue } from "native-base";

export function ViewUsersScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataLoading, setDataLoading] = useState(new Array(30).fill(0));
    const [dataFilterUsers, setDataFilterUsers] = useState([]);
    const [searchValues, setSearchValues] = useState('');

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(URL_API_BACK_END + 'users');
            const json = await response.json();
            setDataUsers(json);
            setLoading(false);
        } catch (error) {
            // console.error(error);
        }
    }

    useEffect(() => {
        const reloadUsers = navigation.addListener("focus", () => {
            getUsers();
        });
        return reloadUsers
    }, [navigation]);


    function filterUsers(valueFilter) {
        setSearchValues(valueFilter);
        var json = dataUsers.filter(user => user.name.includes(valueFilter) || user.lastName.includes(valueFilter) || user.acessGroup.includes(valueFilter))
        setDataFilterUsers(json);
    }
    function clearFilterUsers() {
        setSearchValues('');
        setDataFilterUsers([]);
    }

    function LoadingUsers() {
        return (
            <Box>
                {dataLoading.map((key, index) => {
                    return (
                        <Center key={key + index} >
                            <Box w={"100%"} h={100} flexDir={"row"} alignItems={"center"} borderRadius={8} style={{ paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5 }}>
                                <Skeleton h={85} w={85} borderRadius={42} marginLeft={1} />
                                <Column flex={1} marginX={0.5}>
                                    <Skeleton.Text lines={1} px="3" maxWidth={"60%"} />
                                    <Skeleton ml="3" marginY={2} h={8} borderRadius={'12'} maxW={'30%'} />
                                </Column>
                            </Box>
                        </Center>);
                })}
            </Box>);
    }

    return (
        <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }} >
            <Row mt={2} marginX={4} alignItems={'center'}>
                <Box flexGrow={1}>
                    <InputField value={searchValues} onChangeText={(value) => filterUsers(value)} mb={"0px"} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar usuário..." py="1" px="3" InputLeftElement={<Icon ml="3" size="5" Color={'gray.400'} as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
                </Box>
                <IconButton onPress={() => clearFilterUsers()} icon={<Icon as={MaterialIcons} size="7" name="clear" />} _icon={{ color: useColorModeValue('#FFF', '#0084da'), size: 'md' }} _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} w={12} h={12} borderRadius={10} marginLeft={2} />
            </Row>
            {isLoading ? <LoadingUsers /> : <ListUsers tag="Nome do Livro" data={dataFilterUsers.length == 0 && searchValues == '' ? dataUsers : dataFilterUsers} />}
        </Box>
    );
}
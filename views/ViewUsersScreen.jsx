import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, Column } from "native-base";
import { ListUsers } from '../listings/ListUsers';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import { URL_API_BACK_END } from '@env';
import { useColorModeValue } from "native-base";

export function ViewUsersScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [dataLoading, setDataLoading] = useState(new Array(30).fill(0));

    const getUsers = async () => {
        try {
            const response = await fetch(URL_API_BACK_END + 'users');
            const json = await response.json();
            setData(json);
        } catch (error) {
            // console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    /*   const filterBooks = data.filter(title => title.includes()) */


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
    const HeaderFlatList = () => (
        <Center flexDir={'row'} w={"95%"} alignSelf={'center'} mt={2} mb={2}>
            <Box flexGrow={1}>
                <InputField onChangeText={(value) => setSearchValue(value)} value={searchValue} keyboardType="default" w={"100%"} size={"lg"} h={12} placeholder="Pesquisar" py="1" px="3" InputLeftElement={<Icon ml="3" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />} />
            </Box>
            <IconButton icon={<Icon as={MaterialCommunityIcons} size="6" name="filter-outline" />} _icon={{ color: useColorModeValue('#FFF', '#0084da'), size: 'md' }} _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} w={10} h={10} borderRadius={20} marginLeft={2} />
        </Center>
    );

    return (
        <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }} >
            <HeaderFlatList />
            {isLoading ? <LoadingUsers /> : <ListUsers tag="Nome do Livro" data={data} />}
        </Box>
    );
}
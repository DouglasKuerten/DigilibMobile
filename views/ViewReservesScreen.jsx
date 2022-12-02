import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton } from "native-base";
import { ListReserves } from '../listings/ListReserves';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import { URL_API_BACK_END } from '@env';

export function ViewReservesScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dataLoading, setDataLoading] = useState(new Array(30).fill(0));

  const getReserves = async () => {
    try {
      const response = await fetch(URL_API_BACK_END + 'reserves');
      const json = await response.json();
      setData(json);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReserves();
  }, []);

  /*   const filterBooks = data.filter(title => title.includes()) */


  function LoadingReservs() {
    return (
      <Box>
        {dataLoading.map((key, index) => {
          return (
            <Center key={key + index}>
              <Box w={"95%"} bgColor={"gray.300"} h={60} flexDir={"row"} alignItems={"center"} borderRadius={8} style={{ paddingHorizontal: 10, paddingVertical: 10, marginVertical: 1, marginHorizontal: 5 }}>
                <Skeleton h={35} w={35} borderRadius={20} marginLeft={1} />
                <Skeleton.Text lines={2} px="3" maxWidth={"90%"} />
              </Box>
            </Center>);
        })}
      </Box>);
  }
  const HeaderFlatList = () => (
    <Center flexDir={'row'} w={"95%"} alignSelf={'center'} marginTop={2}>
      <Box flexGrow={1}>
        <InputField value={searchValue} onChangeText={(value) => setSearchValue(value)} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar" py="1" px="3" InputLeftElement={<Icon ml="3" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
      </Box>
      <IconButton icon={<Icon as={MaterialCommunityIcons} size="6" name="filter-outline" />} _icon={{ color: "white", size: "md" }} bg={"blue.400"} w={10} h={10} borderRadius={20} marginLeft={2} />
    </Center>
  );

  return (
    <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }} >
      <HeaderFlatList />
      {isLoading ? <LoadingReservs /> : <ListReserves tag="Nome do Livro" data={data} />}
    </Box>
  );
}
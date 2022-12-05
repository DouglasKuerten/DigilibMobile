import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, useColorModeValue, Column, Row } from "native-base";
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
  const [dataLoading, setDataLoading] = useState(new Array(10).fill(0));

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


  function SkeletonReserves() {
    return (
      <Box>
        <Column h={'100%'} ml={4} mr={4} marginY={1.5} >
          {
            dataLoading.map((key, index) => {
              return (
                <Row key={key + index}>
                  <Skeleton mr={2} marginY={1} w={'100'} h={'150'} borderRadius={'10'} />
                  <Column flex={1} marginX={0.5}>
                    <Skeleton marginY={2} h={6} borderRadius={'10'} />
                    <Skeleton.Text marginY={1} lines={1} maxW={'90%'} />
                    <Skeleton.Text marginY={1} lines={1} maxW={'70%'} />
                    <Skeleton.Text marginY={1} lines={1} maxW={'70%'} />
                    <Skeleton marginY={2} h={8} borderRadius={'10'} maxW={'40%'} />
                  </Column>
                </Row>
              )
            })
          }
        </Column>
      </Box >);
  }
  const HeaderFlatList = () => (
    <Center flexDir={'row'} w={"95%"} alignSelf={'center'} marginTop={2}>
      <Box flexGrow={1}>
        <InputField value={searchValue} onChangeText={(value) => setSearchValue(value)} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar" py="1" px="3" InputLeftElement={<Icon ml="3" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
      </Box>
      <IconButton icon={<Icon as={MaterialCommunityIcons} size="6" name="filter-outline" />} _icon={{ color: useColorModeValue('#FFF', '#0084da'), size: 'md' }} _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} w={10} h={10} borderRadius={20} marginLeft={2} />
    </Center>
  );

  return (
    <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }} >
      <HeaderFlatList />
      {isLoading ? <SkeletonReserves /> : <ListReserves tag="Nome do Livro" data={data} />}
    </Box>
  );
}
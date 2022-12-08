import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, useColorModeValue, Column, Row } from "native-base";
import { ListReserves } from '../listings/ListReserves';
import { MaterialIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import { URL_API_BACK_END } from '@env';

export function ViewReservesScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [dataReserves, setDataReserves] = useState([]);
  const [dataLoading, setDataLoading] = useState(new Array(10).fill(0));
  const [dataFilterReserves, setDataFilterReserves] = useState([]);
  const [searchValues, setSearchValues] = useState('');

  const getReserves = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_API_BACK_END + 'reserves');
      const json = await response.json();
      setDataReserves(json);
      setLoading(false);
    } catch (error) {
      // console.error(error);
    }
  }

  useEffect(() => {
    const reloadReserves = navigation.addListener("focus", () => {
      getReserves();
    });
    return reloadReserves
  }, [navigation]);


  function filterReserves(valueFilter) {
    setSearchValues(valueFilter);
    var json = dataReserves.filter(reserve => reserve.Book.title.includes(valueFilter) || reserve.User.name.includes(valueFilter) || reserve.User.lastName.includes(valueFilter) || reserve.reserveStatus.includes(valueFilter))
    setDataFilterReserves(json);
  }
  function clearFilterReserves() {
    setSearchValues('');
    setDataFilterReserves([]);
  }

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

  return (
    <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }} >
      <Row mt={2} marginX={4} alignItems={'center'}>
        <Box flexGrow={1}>
          <InputField value={searchValues} onChangeText={(value) => filterReserves(value)} mb={"0px"} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar empréstimo..." py="1" px="3" InputLeftElement={<Icon ml="3" size="5" Color={'gray.400'} as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
        </Box>
        <IconButton onPress={() => clearFilterReserves()} icon={<Icon as={MaterialIcons} size="7" name="clear" />} _icon={{ color: useColorModeValue('#FFF', '#0084da'), size: 'md' }} _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.100' }} w={12} h={12} borderRadius={10} marginLeft={2} />
      </Row>
      {isLoading ? <SkeletonReserves /> : <ListReserves tag="Nome do Livro" data={dataFilterReserves.length == 0 && searchValues == '' ? dataReserves : dataFilterReserves} />}
    </Box>
  );
}
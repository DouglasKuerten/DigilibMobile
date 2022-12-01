import React, { useEffect, useState, useContext } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, Row, Column } from "native-base";
import { ListBooks } from '../listings/ListBooks';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import { URL_API_BACK_END } from '@env';
import { AuthContext } from "../navigation/AuthContext"

export function ViewBooksScreen() {
  const { userToken } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dataLoading, setDataLoading] = useState(new Array(5).fill(0));

  const getBooks = async () => {
    try {
      const response = await fetch(URL_API_BACK_END + 'books');
      const json = await response.json();
      setData(json);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  /*   const filterBooks = data.filter(title => title.includes()) */

  function SkeletonMyBooks() {
    return (
      <Box>
        <Skeleton.Text mt={5} lines={1} paddingX={4} maxWidth={"70%"} />
        <Row ml={4} h={240}>
          {dataLoading.map((key, index) => {
            return (
              <Box key={key + index} pt={2} >
                <Skeleton mr={2} marginY={1.5} w={'150'} h={'225'} borderRadius={'10'} />
              </Box>
            )
          })}
        </Row>
      </Box>
    );
  };
  function SkeletonAllBooks() {
    return (
      <Box>
        <Skeleton.Text mt={5} lines={1} paddingX={4} maxWidth={"65%"} />
        <Column h={'100%'} ml={4} mr={4} marginY={1.5} >
          {
            dataLoading.map((key, index) => {
              return (
                <Row key={key + index}>
                  <Skeleton mr={2} marginY={1} w={'100'} h={'150'} borderRadius={'10'} />
                  <Column flex={1} marginX={0.5}>
                    <Skeleton.Text marginY={2} lines={1} />
                    <Skeleton.Text marginY={2} lines={1} />
                    <Row >
                      <Skeleton.Text mr={1} paddingY={2} lines={1} w={4} />
                      <Skeleton.Text mr={3} paddingY={2} lines={1} w={20} />
                      <Skeleton.Text mr={1} paddingY={2} lines={1} w={4} />
                      <Skeleton.Text mr={3} paddingY={2} lines={1} w={20} />
                    </Row>
                    <Skeleton.Text mr={3} paddingY={2} lines={1} w={20} />
                  </Column>
                </Row>
              )
            })
          }
        </Column>
      </Box >);
  };
  function LoadingBooks() {
    return (
      <Box>
        {userToken !== null ? <SkeletonMyBooks /> : null}
        <SkeletonAllBooks />
      </Box>);
  }
  const SearchInput = () => (
    <Row mt={2} marginX={4} alignItems={'center'}>
      <Box flexGrow={1}>
        <InputField value={searchValue} onChangeText={(value) => setSearchValue(value)} mb={"0px"} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar" py="1" px="3" InputLeftElement={<Icon ml="3" size="5" Color={'gray.400'} as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
      </Box>
      <IconButton icon={<Icon as={MaterialCommunityIcons} size="6" name="filter-outline" />} _icon={{ color: "white", size: "md" }} bg={"blue.400"} w={10} h={10} borderRadius={20} marginLeft={2} />
    </Row>
  );

  return (
    <Box flex={1} justifyContent={"flex-start"} w="100%" _light={{ bgColor: 'gray.200' }} _dark={{ bgColor: 'dark.50' }} >
      <SearchInput />
      {isLoading ? <LoadingBooks /> : <ListBooks tag="Nome do Livro" data={data} />}
    </Box>
  );
}
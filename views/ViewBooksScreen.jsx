import React, { useEffect, useState } from 'react';
import { Box, Icon, IconButton, Center, Skeleton, Row } from "native-base";
import { ListBooks } from '../listings/ListBooks';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputField } from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";

export function ViewBooksScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dataLoading, setDataLoading] = useState(new Array(30).fill(0));

  const getBooks = async () => {
    try {
      /* const response = await fetch('https://book-library-back.herokuapp.com/books'); */
      const response = await fetch('http://172.31.0.52:3000/books');
      const json = await response.json();
      setData(json);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  //Envia dados do formulário backend
  async function setBooks() {
    console.log("Exec")
    let reqs = await fetch('http://172.31.0.52:3000/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        internalCode: "1",
        isbn: "12",
        title: "titulo",
        subtitle: "subtitulo",
        genre: "genre",
        volume: "volume",
        edition: "edicao",
        collection: "collection",
        language: "pt",
        synopsis: "synop",
        originCountry: "brasil",
        author: "eu",
        authorLastName: "eueu",
        publishingCompany: "diglilb",
        publishDate: null,
        pages: 55,
        ageGroup: 16,
        bookImage: null,
        bookSituation: "Livre"
      })
    });
    let ress = await reqs.text();
    console.log(ress)
  }

  const getBookss = async () => {
    try {
      const response = await fetch(
        'http://172.31.0.52:3000/books'
      );
      const json = await response.json();
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
    //setBooks()
  }, []);

  /*   const filterBooks = data.filter(title => title.includes()) */


  function LoadingBooks() {
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
  const SearchInput = () => (
    <Row mt={2} marginX={4} alignItems={'center'}>
      <Box flexGrow={1}>
        <InputField value={searchValue} onChangeText={(value) => setSearchValue(value)} mb={"0px"} w={"100%"} size={"lg"} h={12} placeholder="Pesquisar" py="1" px="3" InputLeftElement={<Icon ml="3" size="5" color="gray.400" as={<Ionicons name="ios-search" />} />} keyboardType={"default"} />
      </Box>
      <IconButton icon={<Icon as={MaterialCommunityIcons} size="6" name="filter-outline" />} _icon={{ color: "white", size: "md" }} bg={"blue.400"} w={10} h={10} borderRadius={20} marginLeft={2} />
    </Row>
  );

  return (
    <Box flex={1} justifyContent={"flex-start"} w="100%" bgColor={"gray.100"} >
      <SearchInput />
      {isLoading ? <LoadingBooks /> : <ListBooks tag="Nome do Livro" data={data} />}
    </Box>
  );
}
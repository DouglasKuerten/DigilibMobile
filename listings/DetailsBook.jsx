import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Box, Heading, Text, Icon, ScrollView, Divider, Center, Image, Row, Column } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ButtonUnderline } from "../components/ButtonUnderline"


export function DetailsBook(props) {
    return (
        <Box flex={1} w={'100%'} flexDirection={'column'}>
            <Box w={'100%'} justifyContent={'space-around'} flexDir={'row'} height={255}>
                <Box pl={2} pb={5} w={155}>
                    <Image source={require('../assets/imagemProvisoria.png')} alt={'Foto Livro'} resizeMode='cover' style={{ flex: 1, width: 155, height: 225 }} borderRadius={10} />
                </Box>
                <Box flex={1} pl={4}>
                    <Heading size={'lg'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.title}</Heading>
                    <Text _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{`${props.dbValues.author !== null ? props.dbValues.author : ' '} ${props.dbValues.authorLastName !== null ? props.dbValues.authorLastName : ' '}`}</Text>
                    <Row pt={2}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                props.dbValues.genre !== undefined && props.dbValues.genre !== null ?
                                    props.dbValues.genre.split(',').map((gen, index) => {
                                        return (
                                            < Center key={index} bgColor={'blue.300'} borderRadius={10} marginRight={2} paddingX={3} paddingY={2} >
                                                <Text color={'blue.600'} >{gen}</Text>
                                            </Center>)
                                    }) : null
                            }
                        </ScrollView>
                    </Row>
                </Box>
            </Box>

            <Box flexDir={'row'} paddingY={5} mb={5} marginX={2} borderRadius={20} bgColor={'rgba(0,0,0,0.1)'}>
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.ageGroup !== null ? props.dbValues.ageGroup : '-'}</Heading>
                    <Text _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Classificação</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.pages !== null ? props.dbValues.pages : '-'}</Heading>
                    <Text _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Nº Páginas</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.bookSituation !== null ? props.dbValues.bookSituation : '-'}</Heading>
                    <Text _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Situação</Text>
                </Box>
            </Box>
            <Box flexDir={'row'} p={2} pr={6} pb={5}>
                <Box w={1} h={'100%'} backgroundColor={'blue.500'} opacity={0.2} />
                <Column pl={5}>
                    <Heading color={'blue.400'} size={'md'} mb={4}>Descrição</Heading>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} >
                        <Text _light={{ color: 'black' }} _dark={{ color: 'gray.200' }} textAlign={'justify'}>{props.dbValues.synopsis}</Text>
                    </ScrollView>
                </Column>
            </Box>
        </Box >
    );

}
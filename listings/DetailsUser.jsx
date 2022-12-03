import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Box, Heading, Text, Icon, ScrollView, Divider, Center, Image, Row, Column } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ButtonUnderline } from "../components/ButtonUnderline"


export function DetailsUser(props) {
    return (
        <Box flex={1} w={'100%'} flexDirection={'column'}>
            <Box w={'100%'} justifyContent={'space-around'} flexDir={'row'} height={200}>
                <Box pl={2} pb={5} w={200}>
                    <Image source={require('../assets/elon.png')} alt={'Foto Livro'} resizeMode='cover' style={{ flex: 1, width: 200, height: 200 }} borderRadius={500} />
                </Box>
                <Box flex={1} pl={4}>
                    <Heading size={'lg'} _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>{`${props.dbValues.name !== null ? props.dbValues.name : ' '} ${props.dbValues.lastName !== null ? props.dbValues.lastName : ' '}`}</Heading>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>Matricula: {props.dbValues.registration}</Text>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>E-mail: {props.dbValues.email}</Text>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>Telefone: {props.dbValues.phoneNumber}</Text>
                    <Row pt={2}>
                        < Center _light={{ bgColor: 'dark.100' }} _dark={{ bgColor: 'dark.50' }} borderRadius={10} marginRight={2} paddingX={3} paddingY={2} >
                            <Text color={'darkBlue.400'} >{props.dbValues.acessGroup}</Text>
                        </Center>
                    </Row>
                </Box>
            </Box>

            {/*             <Box flexDir={'row'} paddingY={5} mb={5} marginX={2} borderRadius={20} bgColor={'rgba(0,0,0,0.3)'}>
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} color={'white'}>{props.dbValues.ageGroup}</Heading>
                    <Text color={'white'}>Classificação</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} color={'white'}>{props.dbValues.pages}</Heading>
                    <Text color={'white'}>Nº Páginas</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box flex={1} alignItems={'center'}>
                    <Heading size={'md'} color={'white'}>{props.dbValues.bookSituation}</Heading>
                    <Text color={'white'}>Situação</Text>
                </Box>
            </Box> */}
            {/*             <Box flexDir={'row'} p={2} pr={6} pb={5} bgColor={'gray.700'}>
                <Box w={1} h={'100%'} backgroundColor={'blue.500'} opacity={0.2} />
                <Column pl={5}>
                    <Heading color={'blue.400'} size={'md'} mb={4}>Descrição</Heading>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} >
                        <Text color={'gray.300'}>{props.dbValues.synopsis}</Text>
                    </ScrollView>
                </Column>
            </Box> */}
        </Box >
    );

}
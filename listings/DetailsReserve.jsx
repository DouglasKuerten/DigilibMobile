import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Box, Heading, Text, ScrollView, Divider, Center, Image, Row, Column } from "native-base";
import moment from 'moment'; import 'moment/locale/pt-br'
import { Buffer } from "buffer";

export function DetailsReserve(props) {
    return (
        <Box flex={1} w={'100%'} flexDirection={'column'}>
            <Box w={'100%'} justifyContent={'space-around'} flexDir={'row'} height={255}>
                <Box pl={2} pb={5} w={155}>
                    <Image source={{ uri:'data:image/jpeg;base64,' + fromBase64(props.dbValues.Book.bookImage) }} alt={'Foto Livro'} resizeMode='cover' style={{ flex: 1, width: 155, height: 225 }} borderRadius={10} />
                </Box>
                <Box flex={1} pl={4}>
                    <Heading ellipsizeMode={'tail'} numberOfLines={1} size={'lg'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.Book.title}</Heading>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Usuário: {props.dbValues.User.name} {props.dbValues.User.lastName}</Text>
                    <Text fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Reserva: {moment(props.dbValues.reserveDate).locale('pt-BR').format('L')}</Text>
                    <Text fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Devolução: {moment(props.dbValues.returnDate).locale('pt-BR').format('L')}</Text>
                    <Center _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.50' }} borderRadius={10} mt={1} mb={1} paddingX={3} paddingY={2} maxW={'40%'}>
                        <Text _light={{ color: 'white' }} _dark={{ color: 'darkBlue.400' }} >{props.dbValues.reserveStatus}</Text>
                    </Center>
                    <Text fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>Observação:</Text>
                    <ScrollView mb={5} showsVerticalScrollIndicator={false}>
                        <Text textAlign={'justify'} fontSize={'md'} _light={{ color: 'black' }} _dark={{ color: 'gray.200' }}>{props.dbValues.observation}</Text>

                    </ScrollView>
                </Box>

            </Box>

        </Box >
    );

    function fromBase64(encoded) {
        return Buffer.from(encoded, 'base64').toString('utf8')
    }
}

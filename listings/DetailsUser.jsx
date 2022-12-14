import React from "react";
import { View } from "react-native";
import { Box, Heading, Text, Center, Row, Avatar } from "native-base";
import { Buffer } from "buffer";

export function DetailsUser(props) {
    return (
        <Box flex={1} w={'100%'} flexDirection={'column'}>
            <Box w={'100%'} justifyContent={'space-around'} flexDir={'row'} height={200}>
                <Box ml={2} mb={5} w={200} alignItems={'center'} justifyContent={'center'}>
                    <Avatar source={{ uri:'data:image/png;base64,' + fromBase64(props.dbValues.userImage) }} alt={'Foto Usuário'} resizeMode='cover' size={'180'} />
                </Box>
                <Box flex={1} pl={4}>
                    <Heading size={'lg'} _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>{`${props.dbValues.name !== null ? props.dbValues.name : ' '} ${props.dbValues.lastName !== null ? props.dbValues.lastName : ' '}`}</Heading>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>Matricula: {props.dbValues.registration}</Text>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>E-mail: {props.dbValues.email}</Text>
                    <Text _light={{ color: 'dark.100' }} _dark={{ color: 'gray.200' }}>Telefone: {props.dbValues.phoneNumber}</Text>
                    <Row pt={2}>
                        < Center _light={{ bgColor: '#0084da' }} _dark={{ bgColor: 'dark.50' }} borderRadius={10} marginRight={2} paddingX={3} paddingY={2} >
                            <Text _light={{ color: 'white' }} _dark={{ color: 'darkBlue.400' }} >{props.dbValues.acessGroup}</Text>
                        </Center>
                    </Row>
                </Box>
            </Box>
        </Box >
    );

    function fromBase64(encoded) {
        return Buffer.from(encoded, 'base64').toString('utf8')
    }
}

import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Center, Heading } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function ReadBarcode() {
    const [errors, setErrors] = useState({});
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [codeScan, setCodeScan] = useState('');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setCodeScan(data);
        console.log('Type ' + type + '\nData: ' + data)
    }

    if (hasPermission === null) {
        return <Text>Permissão Pendente</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem Permissão</Text>;
    }

    return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, styles.container]}  >


            <Center flex={1}>
                <Heading mb={450} size={'xl'} color={'white'}>Leitor ISBN</Heading>
                <Box position={'absolute'} w={'90%'} h={135} borderColor={'blue.500'} borderWidth={2} borderRadius={15} borderStyle={'dashed'}></Box>
            </Center>
        </BarCodeScanner>
    );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'absolute'
    }
});
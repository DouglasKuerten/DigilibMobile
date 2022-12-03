import React, { useContext } from 'react';

import { Text, Box, Switch, useColorMode, useColorModeValue } from "native-base";
import { TouchableOpacity, ImageBackground, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setColorMode = async (value) => {
  try {
    await AsyncStorage.setItem('@colorMode', value)
  } catch (e) {

  }
}
const getColorMode = async () => {
  try {
    const value = await AsyncStorage.getItem('@colorMode')
    if (value !== null) {
      console.log(value)
      return value;
    }
  } catch (e) {

  }
}


export function CustomDrawer(props) {
  const { logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  async function toggleColorModeAndSave() {
    toggleColorMode();
    /*     await setColorMode(colorMode);
        console.log(await getColorMode()) */
  }

  return (
    <Box flex={1} _light={{ bgColor: 'white' }} _dark={{ bgColor: 'dark.100' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#000000" }}>
        <Box flex={1} >
          <ImageBackground source={require('../assets/background-drawer.png')} style={{ padding: 40, alignItems: 'center', }}>
            <Image source={require('../assets/userProfile.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
            <Text fontSize={22} color={'white'}>John Fiver</Text>
            <Box style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
              <Ionicons name="laptop-outline" size={13} color="#fff"></Ionicons>
              <Text style={{ color: '#fff', fontSize: 13, paddingStart: 5/* , fontFamily: 'Roboto-Medium' */ }}>Administrador</Text>
            </Box>
          </ImageBackground>
          <Box flex={1} _light={{ bgColor: 'white' }} _dark={{ bgColor: 'dark.100' }} pt={5} >
            <DrawerItemList {...props} />
          </Box>
        </Box>
      </DrawerContentScrollView >
      <Box p={2} borderTopWidth={1} borderTopColor={'#CCC'} flexDirection={'row'} >
        <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 15, width: '80%' }}>
          <Box style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color={useColorModeValue('black', 'white')} />
            <Text fontSize={15} marginLeft={5} _light={{ color: 'dark.200' }} _dark={{ color: 'gray.200' }}>Sair</Text>
          </Box>
        </TouchableOpacity>
        <Switch offTrackColor="dark.200" onTrackColor="light.200" onThumbColor="dark.500" offThumbColor="light.300" onChange={toggleColorModeAndSave} />
      </Box>
    </Box >
  );
}

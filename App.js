import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './navigation/AuthContext'
import { NavigationAuth } from './navigation/NavigationAuth';
import { NativeBaseProvider, useColorMode } from "native-base";
import { RegBooksScreen } from "./screens/RegBooksScreen";
import { ReadBarcode } from "./screens/ReadBarcode";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getColorModeCache = async () => {
  try {
    const value = await AsyncStorage.getItem('@colorMode')
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('Erro');
    return 'light'
  }
}

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  async function getColorThemeAndSet() {
    const theme = await getColorModeCache();
    console.log('Executou: ' + theme)

  }

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <StatusBar
          barStyle="default"
          hidden={false}
          backgroundColor="#007ad6"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <NavigationAuth />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

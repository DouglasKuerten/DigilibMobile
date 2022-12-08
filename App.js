import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './navigation/AuthContext'
import { NavigationAuth } from './navigation/NavigationAuth';
import { NativeBaseProvider, extendTheme } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [themeValue, setThemeValue] = useState("light");
  const getColorModeCache = async () => {
    try {
      const value = await AsyncStorage.getItem('@colorMode')
      if (value !== null) {
        setThemeValue(value)
      }
    } catch (e) {

    }
  }
  getColorModeCache();
  const config = {
    useSystemColorMode: false,
    initialColorMode: themeValue,
  };

  const customTheme = extendTheme({ config });
  return (
    <NativeBaseProvider theme={customTheme}>
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

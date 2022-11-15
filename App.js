import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './navigation/AuthContext'
import { NavigationAuth } from './navigation/NavigationAuth';
import { NativeBaseProvider } from "native-base";

export default function App() {
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

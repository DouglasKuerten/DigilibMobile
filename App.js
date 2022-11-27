import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './navigation/AuthContext'
import { NavigationAuth } from './navigation/NavigationAuth';
import { NativeBaseProvider } from "native-base";
import { RegBooksScreen } from "./screens/RegBooksScreen";
import { ReadBarcode } from "./screens/ReadBarcode";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator(); */
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
      {/*       <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Cadastro de Livros" component={RegBooksScreen} />
          <Stack.Screen name="Leitor Código Barras" component={ReadBarcode} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </NativeBaseProvider>
  );
}

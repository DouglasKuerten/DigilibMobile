import { BookValueContextProvider } from '../contexts/RegisterBookContext'
import { RegBooksScreen } from './RegBooksScreen'
import { ReadBarcode } from './ReadBarcode'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function RegisterBooksScreen() {
    return (
        <BookValueContextProvider>
            <Stack.Navigator defaultScreenOptions={RegBooksScreen} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Cadastro de Livross" component={RegBooksScreen} />
                <Stack.Screen name="Leitor Código Barras" component={ReadBarcode} />
            </Stack.Navigator>
        </BookValueContextProvider>
    )
}
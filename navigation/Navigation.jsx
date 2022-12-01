import React from 'react';

import { HomeScreen } from "../screens/HomeScreen";
import { RegBooksScreen } from "../screens/RegBooksScreen";
import { RegUserScreen } from "../screens/RegUserScreen";
import { ViewUsersScreen } from "../views/ViewUsersScreen";
import { RegReservesScreen } from "../screens/RegReservesScreen";
import { ViewBooksScreen } from "../views/ViewBooksScreen";
import { ViewReservesScreen } from "../views/ViewReservesScreen";
import { ReadBarcode } from "../screens/ReadBarcode";
import { RegisterBooksScreen } from '../screens/RegisterBooksScreen'

import { CustomDrawer } from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";
export function Navigation() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: true, headerTintColor: "#FFF", headerStyle: { backgroundColor: "#0084da" }, drawerActiveBackgroundColor: "#0084da", drawerActiveTintColor: "#fff", drawerLabelStyle: { marginLeft: -25, /* fontFamily: "Roboto-Medium", */ fontSize: 15 } }}
            useLegacyImplementation
            initialRouteName="Login">
            <Drawer.Screen name="Tela Inicial" component={HomeScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Livros" component={RegisterBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Usuários" component={RegUserScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Lista de Usuários" component={ViewUsersScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Empréstimos" component={RegReservesScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Visualização de Empréstimos" component={ViewReservesScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="pricetags-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Visualização de Livros" component={ViewBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="library-outline" size={22} color={color} /> }} />
            {/*             <Drawer.Screen name="Leitor Código Barras" component={ReadBarcode} options={{ drawerIcon: ({ color }) => <Ionicons name="barcode-outline" size={22} color={color} /> }} /> */}
        </Drawer.Navigator>
    );
}
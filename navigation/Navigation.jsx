import React from 'react';

import { HomeScreen } from "../screens/HomeScreen";
import { RegBooksScreen } from "../screens/RegBooksScreen";
import { RegUserScreen } from "../screens/RegUserScreen";
import { RegLoanScreen } from "../screens/RegLoanScreen";
import { ViewBooksScreen } from "../screens/ViewBooksScreen";
import { ViewLoanScreen } from "../screens/ViewLoanScreen";

import { CustomDrawer } from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";
export function Navigation() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: true, headerTintColor: "#FFF", headerStyle: {backgroundColor: "#0084da"}, drawerActiveBackgroundColor: "#0084da", drawerActiveTintColor: "#fff", drawerLabelStyle: { marginLeft: -25, /* fontFamily: "Roboto-Medium", */ fontSize: 15 } }}
            useLegacyImplementation
            initialRouteName="Login">
            <Drawer.Screen name="Tela Inicial" component={HomeScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Livros" component={RegBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Usuários" component={RegUserScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Empréstimos" component={RegLoanScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Visualização de Empréstimos" component={ViewLoanScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="pricetags-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Visualização de Livros" component={ViewBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="library-outline" size={22} color={color} /> }} />
        </Drawer.Navigator>
    );
}
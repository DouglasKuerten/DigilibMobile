import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'

import { AuthContext } from "./AuthContext"

import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./Navigation"
import { NavigationLogin } from "./NavigationLogin"


export function NavigationAuth() {
    const { isLoading, userToken } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken !== null ? <Navigation /> : <NavigationLogin />}
        </NavigationContainer>
    );
}
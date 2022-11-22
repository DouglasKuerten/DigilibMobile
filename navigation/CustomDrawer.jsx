import React, { useContext } from 'react';

import { Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from './AuthContext';

export function CustomDrawer(props) {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#000000" }}>
        <View Style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10, marging: 20 }}>
          <ImageBackground source={require('../assets/background-drawer.png')} style={{ padding: 40, alignItems: 'center', }}>
            <Image source={require('../assets/userProfile.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
            <Text style={{ color: '#fff', fontSize: 22/* , fontFamily: 'Roboto-Medium' */ }}>John Fiver</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
              <Ionicons name="laptop-outline" size={13} color="#fff"></Ionicons>
              <Text style={{ color: '#fff', fontSize: 13, paddingStart: 5/* , fontFamily: 'Roboto-Medium' */ }}>Administrador</Text>
            </View>
          </ImageBackground>
          <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 5 }}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView >
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, /* fontFamily: "Roboto-Medium", */ marginLeft: 5 }}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );
}

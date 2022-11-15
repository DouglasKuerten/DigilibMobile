import * as React from 'react';
import { SafeAreaView, View, Image } from "react-native";
import { Button } from "react-native-paper";

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "#202226", justifyContent: "center" }}>
      {/*       <Button mode="contained" onPress={() => navigation.navigate("Cadastro de Livros")}>
        Cadastro de Livros
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Cadastro de Usuários")}>
        Cadastro de Usuários
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Cadastro de Empréstimos")}>
        Cadastro de Empréstimos
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Visualização de Livros")}>
        Visualização de Livros
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Visualização de Empréstimos")}>
        Visualização de Empréstimos
      </Button> */}

      <Image style={{ width: "70%", height: 500, marginBottom: "15%" }} source={require("../assets/logofontebranca.png")}></Image>
    </SafeAreaView>




  );
}

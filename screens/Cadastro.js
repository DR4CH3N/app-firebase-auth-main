import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { auth } from "../firebaseConfig"; // config dentro desse repositorio
import { createUserWithEmailAndPassword } from "firebase/auth"; // biblioteca dentro da firebase

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("atenção!", "voce deve preencher o email e senha!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        Alert.alert(
          "Cadastro",
          "Contra criada com sucesso! gostaria de entrar?",
          [
            {
              text: "Não, quero ficar aqui!",
              onPress: () => {
                return false;
              },
              style: "cancel", // SOMENTE NO IOS
            },
            {
              text: "Sim, gostaria de entrar",
              onPress: () => {
                navigation.replace("AreaLogada");
              },
              style: "destructive", // SOMENTE NO IOS
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            mensagem = "e-mail ja cadastrado!";
            break;
          case "auth/weak-password":
            mensagem = "Senha deve ter no minimo 6 digitos!";
            break;
          case "auth/invalid-email":
            mensagem = "Endereço de email invalido!";
            break;
          default:
            mensagem = "Algo deu errado... tente novamente!";
            break;
        }
        Alert.alert("Atenção", mensagem);
      });
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button title="Cadastre-se" color="blue" onPress={cadastrar} />
        </View>
      </View>
    </View>
  );
};

export default Cadastro;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

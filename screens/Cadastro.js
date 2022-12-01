import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { auth } from "../firebaseConfig"; // config dentro desse repositorio
import { createUserWithEmailAndPassword } from "firebase/auth"; // biblioteca dentro da firebase

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("atenção!", "voce deve preencher o email e senha!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha);
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

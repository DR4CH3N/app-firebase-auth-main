import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

// importamos os recursos de autenticação
import { auth } from "../firebaseConfig";

// importamos as funções de autenticação
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import Cadastro from "./Cadastro";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const ResetSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "email de recuperação enviado!",
          "verifique sua caixa de entrada"
        );
      })
      .catch((error) => console.log(error));
  };

  const Login = () => {
    if (!email || !senha) {
      Alert.alert("atenção!", "Você deve preencher todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate("AreaLogada");
      })
      .catch((error) => {
        let mensagem;
        switch (error.code) {
          case "auth/user-not-found":
            mensagem = "usuario não encontrado!";
            break;
          case "auth/wrong-password":
            mensagem = "senha incorreta";
            break;
          default:
            mensagem = "houve um erro, tente novamente mais tarde";
            break;
        }

        Alert.alert("ops!", mensagem);
      });
  };
  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="E-mail"
          onChangeText={(valor) => setEmail(valor)}
          style={estilos.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button title="Entre" color="green" onPress={Login} />
        </View>

        <View style={estilos.botoes}>
          <Button title="Recuperar senha" color="green" onPress={ResetSenha} />
        </View>
      </View>
    </View>
  );
};

export default Login;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
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

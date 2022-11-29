import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

// importamos os recursos de autenticação
import { auth } from "../firebaseConfig";

// importamos as funções de autenticação
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
        console.log(error);
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

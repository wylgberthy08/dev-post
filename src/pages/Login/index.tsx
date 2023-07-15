import React, { useEffect, useState, useContext } from "react";

import {
  Button,
  ButtonText,
  Container,
  Input,
  SignUpButton,
  SignUpText,
  Title,
} from "./styles";
import { Alert, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/authContext";

export function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  function toggleLogin() {
    setLogin(!login);
  }

  async function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("preencha todos os campos!!");
      return;
    }
    await signIn(email, password);
  }
  async function handleSignUp() {
    if (name === "" || email === "" || password === "") {
      Alert.alert("preencha todos os campos!!");
      return;
    }

    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{ color: "#e52246" }}>Post</Text>
        </Title>

        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="e-mail@gmail.com"
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="*********"
        />

        <Button onPress={handleSignIn}>
          {loadingAuth && <ActivityIndicator size={20} color="#fff" />}
          {!loadingAuth && <ButtonText>Acessar</ButtonText>}
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }
  return (
    <Container>
      <Title>
        Dev<Text style={{ color: "#e52246" }}>Post</Text>
      </Title>
      <Input
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Seu nome"
      />
      <Input
        value={email.trim()}
        placeholder="e-mail@gmail.com"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="*********"
      />

      <Button onPress={handleSignUp}>
        {loadingAuth && <ActivityIndicator size={20} color="#fff" />}
        {!loadingAuth && <ButtonText>Cadastrar</ButtonText>}
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>ja possuo uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}

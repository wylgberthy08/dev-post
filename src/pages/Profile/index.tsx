import React, { useContext } from "react";

import { Container, Title } from "./styles";
import { Button } from "react-native";
import { AuthContext } from "../../contexts/authContext";

export function Profile() {
  const { signOut } = useContext(AuthContext);

  async function handleSignUp() {
    await signOut();
  }

  return (
    <Container>
      <Title>Profile</Title>
      <Button onPress={handleSignUp} title="Sair" />
    </Container>
  );
}

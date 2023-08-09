import React, { useContext, useState } from "react";

import {
  Avatar,
  Button,
  ButtonText,
  Container,
  Email,
  Name,
  UploadButton,
  UploadText,
} from "./styles";
import { AuthContext } from "../../contexts/authContext";
import { Header } from "../../components/Header";

export function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [url, setUrl] = useState('https://picsum.photos/200');

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton>
          <UploadText>+</UploadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      <Name>Wylgberthy</Name>
      <Email>teste@teste.com</Email>
      <Button bg="#428cfd">
        <ButtonText color="#fff">Atualizar perfil</ButtonText>
      </Button>
      <Button onPress={handleSignOut} bg="#fff">
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>
    </Container>
  );
}

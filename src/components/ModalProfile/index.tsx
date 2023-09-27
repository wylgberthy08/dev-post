import React from "react";

import { ButtonBack, ButtonBackText, Container, Input } from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { Modal, Platform } from "react-native";
import { Button, ButtonText } from "../../pages/Profile/styles";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onUpdateProfile: () => Promise<void>;
}

export function ModalProfile({
  visible,
  onClose,
  placeholder,
  value,
  onUpdateProfile,
  onChange,
}: ModalProps) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <Container behavior={Platform.OS === "android" ? "" : "padding"}>
        <ButtonBack onPress={onClose}>
          <Feather name="arrow-left" />
          <ButtonBackText>Voltar</ButtonBackText>
        </ButtonBack>
        <Input
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
        />
        <Button onPress={onUpdateProfile} bg="#428cfd">
          <ButtonText color="#fff">Atualizar</ButtonText>
        </Button>
      </Container>
    </Modal>
  );
}

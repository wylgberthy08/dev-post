import React from "react";

import { Container, Title } from "./styles";
import { Text } from "react-native";

export function Header() {
  return (
    <Container>
      <Title>
        Dev<Text style={{ color: "#e52246" }}>Post</Text>
      </Title>
    </Container>
  );
}

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #36393f;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 55px;
  font-weight: bold;
  font-style: italic;
`;

export const Input = styled.TextInput`
  width: 80%;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #418cfd;
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity``;

export const SignUpText = styled.Text`
  color: #ddd;
  font-size: 15px;
`;

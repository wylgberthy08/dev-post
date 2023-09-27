import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
  height: 70%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 25px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonBackText = styled.Text``;

export const Input = styled.TextInput`
  background-color: #ddd;
  width: 90%;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  color: #121212;
  text-align: center;
`;

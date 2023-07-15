import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #36393f;
`;

export const Title = styled.Text``;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 60px;
  height: 60px;
  background-color: #202225;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  z-index: 99;
`;

export const ListPost = styled.FlatList`
  flex: 1;
  background-color: #f1f1f1;
`;
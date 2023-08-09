import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #353840;
`;

export const Name = styled.Text`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;
export const Email = styled.Text`
  color: #fff;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-style: italic;
`;

interface PropsButton {
  bg?: string;
  color?: string;
}

export const Button = styled.TouchableOpacity<PropsButton>`
  margin-top: 16px;
  background-color: ${({ bg }) => bg};
  width: 80%;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text<PropsButton>`
  color: ${({ color }) => color};
  font-size: 18px;
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 20%;
  background-color: #ffff;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
export const UploadText = styled.Text`
  font-size: 55px;
  position: absolute;
  color: #e52246;
  opacity: 0.5;
  z-index: 99;
`;
export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 90px;
`;

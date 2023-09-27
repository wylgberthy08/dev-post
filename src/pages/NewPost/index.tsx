import React, { useLayoutEffect, useState, useContext } from "react";

import { Container, Input, Button, ButtonText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/authContext";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

export function NewPosts() {
  const [post, setPost] = useState("");
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === "") {
      return;
    }
    let avatarUrl = null;
    try {
      let response = await storage()
        .ref("users")
        .child(user?.uid ?? "")
        .getDownloadURL();
      avatarUrl = response;
    } catch (err) {
      avatarUrl = null;
    }

    await firestore()
      .collection("posts")
      .add({
        created: new Date(),
        content: post,
        autor: user?.name,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost("");
      })
      .catch((err) => {
        console.log("Erro ao criar o post ", err);
      });
    navigation.navigate("Home");
  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo?"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline
        placeholderTextColor="#ddd"
        maxLength={300}
      />
    </Container>
  );
}

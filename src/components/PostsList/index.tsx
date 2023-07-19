import React, { useState } from "react";

import {
  Actions,
  Avatar,
  Container,
  Content,
  ContentView,
  Header,
  Likes,
  LikesButton,
  Name,
  TimePost,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import firestore from "@react-native-firebase/firestore";

export interface PostProps {
  data: {
    autor: string;
    avatarUrl: string | null;
    content: string;
    created: { nanoseconds: number; seconds: number };
    id: string;
    likes: number;
    userId: string;
  };
  userId: string;
}

export function PostsList({ data, userId }: PostProps) {
  const [likePost, setLikePost] = useState(data?.likes);
  const navigation = useNavigation();
  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  async function handleLikePost(id: string, likes: number) {
    // console.log("id", id, "likes", likes);
    const docId = `${userId}_${id}`;
    // checar se o post já foi curtido
    const doc = await firestore().collection("likes").doc(docId).get();

    if (doc.exists) {
      await firestore()
        .collection("posts")
        .doc(id)
        .update({
          likes: likes - 1,
        });
      await firestore()
        .collection("likes")
        .doc(docId)
        .delete()
        .then(() => {
          setLikePost(likes - 1);
        });
      return;
    }

    await firestore().collection("likes").doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection("posts")
      .doc(id)
      .update({
        likes: likes + 1,
      })
      .then(() => {
        setLikePost(likes + 1);
      });
  }

  return (
    <Container>
      <Header
        onPress={() =>
          navigation.navigate("PostsUser", {
            title: data.autor,
            userId: data.userId,
          })
        }
      >
        {data.avatarUrl && <Avatar source={{ uri: data.avatarUrl }} />}
        {!data.avatarUrl && (
          <Avatar source={require("../../assets/avatar.png")} />
        )}
        <Name>{data.autor}</Name>
      </Header>
      <ContentView>
        <Content>{data.content}</Content>
      </ContentView>

      <Actions>
        <LikesButton onPress={() => handleLikePost(data.id, likePost)}>
          {likePost !== 0 && <Likes>{likePost}</Likes>}

          <MaterialCommunityIcons
            name={likePost === 0 ? "heart-plus-outline" : "cards-heart"}
            size={28}
            color="#e52246"
          />
        </LikesButton>
        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}

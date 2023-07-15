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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostProps {
  data: {
    autor: string;
    avatarUrl: string | null;
    content: string;
    created: { nanoseconds: number; seconds: number };
    id: string;
    likes: number;
  };
  userId: string;
}

export function PostsList({ data, userId }: PostProps) {
  const [likePost, setLikePost] = useState(data?.likes);
  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
    // console.log();
  }
  return (
    <Container>
      <Header>
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
        <LikesButton>
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

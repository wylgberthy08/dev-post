import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import firestore from "@react-native-firebase/firestore";

import { Container, Title } from "./styles";

export function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params?.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === "" ? "" : title,
    });
  }, [navigation, title]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      firestore()
        .collection("posts")
        .where("userId", "==", route.params?.userId)
        .orderBy("created", "desc")
        .get()
        .then((snapshot) => {
          const postList = [];
          snapshot.docs.map((u) => {
            postList.push({
              ...u.data(),
              id: u.id,
            });
          });
          if (isActive) {
            setPosts(postList);
            console.log(postList);
            setLoading(false);
          }
        });
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <Container>
      <Title>{route.params?.title}</Title>
    </Container>
  );
}

import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useContext,
} from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import { AuthContext } from "../../contexts/authContext";

import firestore from "@react-native-firebase/firestore";

import { Container, PostList, Title } from "./styles";
import { ActivityIndicator, View } from "react-native";
import { PostsList } from "../../components/PostsList";

export function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
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
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={50} color="#E52246" />
        </View>
      )}
      {!loading && (
        <PostList
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PostsList data={item} userId={user?.uid} />
          )}
        />
      )}
    </Container>
  );
}

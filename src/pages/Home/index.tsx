import React, { useState, useContext, useCallback, useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
import { ButtonPost, Container, ListPost, Title } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../contexts/authContext";
import { Header } from "../../components/Header";
import { Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from "react-native";
import { PostsList } from "../../components/PostsList";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState("");
  const [emptyList, setEmptyList] = useState(false);

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function fetchPosts() {
      firestore()
        .collection("posts")
        .orderBy("created", "desc")
        .limit(5)
        .get()
        .then((snapshot) => {
          setPosts([]);
          const postList = [];
          snapshot.docs.map((u) => {
            postList.push({
              ...u.data(),
              id: u.id,
            });
          });
          setEmptyList(!!snapshot.empty);
          setPosts(postList);
          setLastItem(snapshot.docs[snapshot.docs.length - 1]);
          setLoading(false);
        });
    }
    fetchPosts();
    console.log("renderizou!!");
  }, []);

  async function handleRefreshPosts() {
    setLoadingRefresh(true);
    firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .limit(5)
      .get()
      .then((snapshot) => {
        setPosts([]);
        const postList = [];
        snapshot.docs.map((u) => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });
        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    setLoadingRefresh(false);
  }

  async function getListPosts() {
    if (emptyList) {
      setLoading(false);
      return null;
    }
    if (loading) return;
    firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then((snapshot) => {
        const postList = [];
        snapshot.docs.map((u) => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });
        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts((oldPosts) => [...oldPosts, ...postList]);
        setLoading(false);
      });
  }

  function handleNavigateToNewPost() {
    navigation.navigate("NewPost" as never);
  }
  return (
    <Container>
      <Header />
      {loading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      )}
      <ListPost
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={({ item }) => <PostsList data={item} userId={user?.uid} />}
        refreshing={loadingRefresh}
        onRefresh={handleRefreshPosts}
        onEndReached={() => getListPosts()}
        onEndReachedThreshold={0.1}
      />
      <ButtonPost onPress={handleNavigateToNewPost}>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

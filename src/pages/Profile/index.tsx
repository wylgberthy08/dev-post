import React, { useContext, useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

import {
  Avatar,
  Button,
  ButtonText,
  Container,
  Email,
  Name,
  UploadButton,
  UploadText,
} from "./styles";
import { AuthContext } from "../../contexts/authContext";
import { Header } from "../../components/Header";
import { ModalProfile } from "../../components/ModalProfile";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Alert } from "react-native";

export function Profile() {
  const { signOut, user, storageUser, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [url, setUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function LoadAvatar() {
      try {
        let response = await storage()
          .ref("users")
          .child(user?.uid)
          .getDownloadURL();
        setUrl(response);
      } catch (err) {
        console.log(err);
      }
    }
    LoadAvatar();
  }, []);

  async function handleSignOut() {
    await signOut();
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function HandleModalClose() {
    setOpenModal(false);
  }
  function uploadFile() {
    const options = {
      noData: true,
      mediaType: "photo",
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("Cancelou!!");
      } else if (response.errorCode === "camera_unavailable") {
        console.log("Ops parece que deu algum erro");
      } else {
        updateFileFirebase(response).then(() => {
          uploadAvatarPosts();
        });
        setUrl(response.assets[0].uri);
      }
    });
  }

  const getFileLocalPath = (response) => {
    return response.assets[0].uri;
  };
  const updateFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref("users").child(user?.uid);
    return await storageRef.putFile(fileSource);
  };

  async function updateProfile() {
    if (name === "") {
      return;
    }
    await firestore().collection("users").doc(user?.uid).update({
      name: name,
    });

    const postDocs = await firestore()
      .collection("posts")
      .where("userId", "==", user?.uid)
      .get();

    postDocs.forEach(async (doc) => {
      await firestore().collection("posts").doc(doc.id).update({
        autor: name,
      });
    });

    let data = {
      uid: user?.uid,
      name: name,
      email: user?.email,
    };
    setUser(data);
    storageUser(data);
    setOpenModal(false);
  }

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref("users").child(user?.uid);
    const url = await storageRef.getDownloadURL().then(async (image) => {
      const postDocs = await firestore()
        .collection("posts")
        .where("userId", "==", user?.uid)
        .get();

      postDocs.forEach(async (doc) => {
        await firestore().collection("posts").doc(doc.id).update({
          avatarUrl: image,
        });
      });
    });
  };
  return (
    <>
      <Container>
        <Header />
        {url ? (
          <UploadButton onPress={uploadFile}>
            <UploadText>+</UploadText>
            <Avatar source={{ uri: url }} />
          </UploadButton>
        ) : (
          <UploadButton onPress={uploadFile}>
            <UploadText>+</UploadText>
          </UploadButton>
        )}
        <Name>{name}</Name>
        <Email>{user?.email}</Email>
        <Button onPress={handleOpenModal} bg="#428cfd">
          <ButtonText color="#fff">Atualizar perfil</ButtonText>
        </Button>
        <Button onPress={handleSignOut} bg="#fff">
          <ButtonText color="#3b3b3b">Sair</ButtonText>
        </Button>
      </Container>
      <ModalProfile
        onUpdateProfile={updateProfile}
        onChange={(text: string) => setName(text)}
        placeholder={user?.name ?? ""}
        value={name ?? ""}
        visible={openModal}
        onClose={HandleModalClose}
      />
    </>
  );
}

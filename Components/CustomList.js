import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../Firebase';
const CustomList = ({id,chatName,enterChat}) => {
  const [chatMessages,setChatMessages] = useState([]);

  useEffect(()=>{
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  })
    
    return (
      <ListItem
        key={id}
        onPress={() => enterChat(id, chatName)}
        key={id}
        bottomDivider
      >
        <Avatar
          rounded
          source={{
            uri:
              chatMessages?.[0]?.photoURL ||
              "https://p7.hiclipart.com/preview/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg",
          }}
          size={50}
        />

        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName} :{chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
}

export default CustomList

const styles = StyleSheet.create({})

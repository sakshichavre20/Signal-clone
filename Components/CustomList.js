import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import { useLayoutEffect } from 'react';
const CustomList = ({id,chatName,enterChat}) => {
    
    return (
      <ListItem onPress={() => enterChat(id, chatName )} 
      key={id} 
      bottomDivider
      >
        <Avatar
          rounded
          source={{
            uri:
              "https://p7.hiclipart.com/preview/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg",
          }}
          size={50}
        />

        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            hiii there
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
}

export default CustomList

const styles = StyleSheet.create({})

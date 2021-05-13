import React from 'react'
import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native'
import { useLayoutEffect } from 'react';
import {Button ,} from 'react-native-elements'
import { useState } from 'react';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import {db} from '../Firebase';

const AddChat = ({navigation}) => {
    const [input ,setInput] = useState('');
    useLayoutEffect(()=> {
        navigation.setOptions({
          title: "Add a new chat",
          headerBackTitle: "Chats",
          headerStyle: {
            backgroundColor: "#054686",
          },
          headerTitleStyle: {
            color:'white'
          },
          headerTintColor:'white'
        });
    }, [navigation])

const createChat =async()=>{
    await db
      .collection("chats")
      .add({
        chatName: input
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => alert(error));
}
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter a chat name"
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.input}
        />
        <TouchableOpacity disabled={!input} onPress={createChat}>
          <View style={styles.button}>
            <Text style={{fontSize:15}}>Create Chat</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    );
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    backgroundColor: "white",
    height: 45,
    width: "90%",
    borderRadius: 20,
    paddingLeft: 10,
    color: "black",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "black",
    borderBottomWidth: 4,
    margin: 2,
  },
  button: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    borderBottomWidth: 4,
  },
});

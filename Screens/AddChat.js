import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect } from 'react';
import {Button ,Input} from 'react-native-elements'
import { useState } from 'react';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import {db} from '../Firebase';

const AddChat = ({navigation}) => {
    const [input ,setInput] = useState('');
    useLayoutEffect(()=> {
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:"Chats",
        })
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
            <Input
            placeholder='Enter a chat name'
            value={input}
            onChangeText ={(text) => setInput(text) }
    
            
            />

            <Button onPress={createChat}
            title="Create Chat"/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        paddingHorizontal:20,
    }
})

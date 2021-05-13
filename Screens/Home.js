import React from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import CustomList from './../Components/CustomList';
import { useLayoutEffect, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {auth, db } from '../Firebase';
import {AntDesign,SimpleLineIcons,Ionicons} from '@expo/vector-icons'
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from "expo-status-bar";

const Home = ({navigation}) => {
  const [chats,setChats] = useState([]);



    const signOutUSer = () =>{
        auth.signOut().then(()=> {
            navigation.replace('Login')
        });
    };
    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(Snapshot =>{
          setChats(Snapshot.docs.map(doc =>({
            id : doc.id,
            data : doc.data()
          })))
        })
        return unsubscribe;
    },[])

useLayoutEffect(()=>{
    navigation.setOptions({
      title: "Chat App",
      headerStyle: { backgroundColor: "#054686" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ width: 95, paddingLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUSer}>
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
              size={50}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 85,
            paddingRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camera" size={29} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <Ionicons name="create" size={29} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
},[navigation])

const enterChat = (id,chatName) => {
    navigation.navigate('Chat',{
      id ,
      chatName ,
    })
}

    return (
      <SafeAreaView>
        <StatusBar style="light"/>
        <ScrollView style={styles.container}>
          {chats.map(({ id, data: { chatName } }) => (
            <CustomList key ={id} id={id} chatName={chatName} enterChat={enterChat}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
  container: {
    height:'100%'
  }
})

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import {
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../Firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            size={40}
            source={{
              uri: messages[0]?.data.photoURL,
                
            }}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 15 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="leftcircle" color="white" size={25} />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 90,
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 15,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp",'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      // web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={25}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      rounded
                      // web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={25}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text>{data.message}</Text>
                    <Text>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Enter message"
                value={input}
                style={styles.inmsg}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={26} color="dodgerblue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 15,
  },
  inmsg: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    color: "black",
    borderRadius: 30,
    backgroundColor: "#edeef7",
  },
  sender: {
    padding: 15,
    alignSelf: "flex-end",
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 20,
  },
  receiver: {
    padding: 15,
    alignSelf: "flex-start",
    backgroundColor: "grey",
    borderRadius: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 20,
  },
});

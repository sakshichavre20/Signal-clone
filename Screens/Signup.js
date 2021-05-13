import React, { useState, useLayoutEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";

import {auth } from '../Firebase'

const Signup = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

useLayoutEffect(()=>{
    navigation.setOptions({
        headerBackTitle:'Back'
    });
},[navigation])

  const register = () => {
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg",
        });

      }).catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <ImageBackground
        mode="cover"
        style={styles.background}
        source={{
          uri: "http://www.allwhitebackground.com/images/7/Blue-Minimalist-Wallpaper-3840x2160-00263.jpg",
        }}
      >
        <TextInput
          style={styles.inputContainer}
          placeholder="UserName"
          type="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="ImageUrl (optional)"
          type="imageUrl"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
        <TouchableOpacity onPress={register}>
          <View style={styles.button}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>SignUP</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default  Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  background: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    height: 45,
    width: "80%",
    borderRadius: 20,
    paddingLeft: 10,
    color: "black",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#054686",
    borderBottomWidth: 4,
    margin: 2,
  },
  button: {
    backgroundColor: "#FFFFFF",
    height: 35,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    borderBottomWidth: 4,
  },
});

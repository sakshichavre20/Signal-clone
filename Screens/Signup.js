import React, { useState, useLayoutEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Button, Input } from "react-native-elements";
import {auth } from '../Firebase'
import Login from './Login';
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
      <Image
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png",
        }}
        style={styles.img}
      />
      <Input
        placeholder="name"
        type="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="password"
        secureTextEntry
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="ImageUrl (optional)"
        type="imageUrl"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        onSubmitEditing={register}
      />
      <Button title="Signup" onPress={register} />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
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
});

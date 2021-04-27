import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,KeyboardAvoidingView,Image} from 'react-native';
import {Button ,Input} from 'react-native-elements'
import { auth } from "../Firebase";
import Signup from './Signup';
import Home from './Home';
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
    const unsubscrbe   = auth.onAuthStateChanged((authUser) =>{
      
            if(authUser){
                console.log(authUser);
                navigation.replace('Home')
            }else{
              console.log("No user");
            }
        });
        return unsubscrbe;
    }, [])


    const SignIn =() => {
          auth
          .signInWithEmailAndPassword(email,password)
          .catch(error => alert(error))
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
          onSubmitEditing={SignIn}
        />
        <Button title="Login" onPress={SignIn} />
        <Button
          title="Signup"
          onPress={() => navigation.navigate("Signup")}
        />
      </KeyboardAvoidingView>
    );

}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width:150,
        height:150,
        marginBottom:50
    }
})

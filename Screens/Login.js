import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,KeyboardAvoidingView,Image,ImageBackground,TextInput,TouchableOpacity} from 'react-native';
import {Button } from 'react-native-elements'
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
        <ImageBackground
          mode="cover"
          style={styles.background}
          source={{
            uri:
              "https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        >
          <TextInput
            placeholder="Email"
            type="email"
            style={styles.inputContainer}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            type="password"
            style={styles.inputContainer}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={SignIn}
          />
          <TouchableOpacity onPress={SignIn}>
            <View style={styles.button}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={styles.button}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>SignUP</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    );

}

export default Login

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
    borderColor: "black",
    borderBottomWidth: 4,
    margin: 2,
  },
  button: {
    backgroundColor: "white",
    height: 35,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    borderBottomWidth: 4,
  },
});

import {  ActivityIndicator, Alert, KeyboardAvoidingView, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation: stackNavigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  
    const handleSignIn = () => {
      if (!email || !password) {
        Alert.alert('Missing Information', 'Please fill in both email and password fields.');
      } else {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential.user;
            console.log("user details", user);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Sign-in error:", error);
            // Handle the sign-in error here, e.g., show an error message to the user.
            Alert.alert('Sign-in Error', 'email and password does not exist');
          });
      }
    }
  
    useEffect(() => {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
          setLoading(false);
        }
        if (authUser) {
          navigation.navigate("Main");
        }
      });
  
      return unsubscribe;
    }, []);
  



  return (

    <SafeAreaView

      style={{
        flex: 1,
        backgroundColor: "#e6dada",
        padding: 10,
        alignItems: "center",
      }}>
        {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (  
    <KeyboardAvoidingView>
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <Text style={{ color: "#5D4157", fontSize: 17, fontWeight: "700" }}>
        Sign In
      </Text>

      <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
        Sign In to Your Account
      </Text>
    </View>

    <View style={{ marginTop: 50 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
          Email
        </Text>


        <TextInput 
        placeholder='enter your email ' 
        placeholderTextColor={"black"}
        value={email} onChangeText={text => setEmail(text)}
          style={{
            fontSize: email ? 18 : 18,
            borderColor: "gray",
            borderWidth: 1,
            padding:10,
            borderRadius:15,
            marginVertical: 10,
            width: 300,
          }} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
          Password
        </Text>

      <TextInput
        placeholder='enter the password'
        value={password}
        secureTextEntry={true}
        placeholderTextColor={"black"}
        onChangeText={text => setPassword(text)}
        style={{
          fontSize: password ? 18 : 18,
          borderColor: "gray",
          borderWidth: 1,
          padding:10,
          borderRadius:15,
          marginVertical: 10,
          marginBottom:20,
          width: 300,
        }}
      />
      </View>
      <TouchableOpacity
  onPress={handleSignIn}
    style={{
      width: 200,
      padding: 15,
      borderRadius: 25,
      marginTop: 10,
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <Text
      style={{
        textAlign: "center",
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        backgroundColor:"#5D4157",
        padding:15,
        borderRadius:30
      }}
    >
      SignIn
    </Text>
  </TouchableOpacity>
   
      <Pressable onPress={() => navigation.navigate("Signup")}  style={{ marginTop: 20 }}>
        <Text 
        style={{
           textAlign: "center",
            color: "gray", 
            fontSize: 17 ,
            }}>dont have an account signup</Text>
      </Pressable>
    
    </View>
  </KeyboardAvoidingView>     
      )}       
    </SafeAreaView>
  );
};

export default LoginScreen


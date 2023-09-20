import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SettingsScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <LinearGradient colors={["#3494E6","#904e95" ,"#EC6EAD"]} style={{ flex: 1 }}>
    <SafeAreaView
      style={{ 
        justifyContent: "center",
        alignItems: "center",
        flex: 1 
      }}>
      <View>
        <Pressable style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 20,color:"white"}}>welcome {user.email}</Text>
        </Pressable>

        <Pressable onPress={signOutUser}>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "white",
              borderWidth: 1,
              padding: 10,
              margin: 30,
              backgroundColor: "#1d5a80",
              borderColor:"transparent",
              borderRadius:25
            }}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen

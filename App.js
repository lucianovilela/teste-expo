import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { logEvent } from 'firebase/analytics';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import {  auth } from './firebase';
import Agenda from './Agenda';

export default function App() {
  const [ info, setInfo ] = React.useState({user:undefined})
  React.useEffect(()=>{
    //logEvent(analytics, "page_view", {key:'/'});
    onAuthStateChanged(auth, (user)=>{
      console.log(user)
      setInfo({...info, user:user})
    })
  },[])
  
  return (
    <View style={styles.container}>

      <Agenda />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

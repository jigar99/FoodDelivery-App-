import react from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
     TextInput 
  } from 'react-native';

  import React, {useState,useEffect} from 'react';

  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { useRecoilValue } from "recoil";
  import {currentUserState} from '../atoms/user'

  const Account = ({navigation}) => {
  // export default function Account(props) {

    const [input, setInput] = useState('');
    const recoilCurrentUser = useRecoilValue(currentUserState);
    
    
    const handleSubmit = () => {
      navigation.popToTop();
    }
    
    
    useEffect(() => {
      const readData = async () => {
        try {
          console.log("Inside READ")
          const value = await AsyncStorage.getItem("@user_name");
          console.log({value});
          if (value !== null) {
            setInput(value);
          }
        } catch (e) {
          //alert('Failed to fetch the input from storage');
        }
      };
      readData();
    });


    return( 
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={require('../assets/images/avatar-3.jpg')}
      />
      {/* {recoilCurrentUser.firstName} {recoilCurrentUser.lastName} */}
      <Text style={styles.label}>Jigar Vaishnav</Text>
      <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {

        navigation.navigate('UpdateAccount');

      }}>
        <Text style={styles.changeAvatarButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerp} onPress={() => {

      navigation.navigate('Payment');

  }}>
      <View></View>
        <Text style={styles.labelp}>Add Payment </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerp} onPress={() => {

  navigation.navigate('Rating');

  }}>
  
  <Text style={styles.labelp}>Add Rating </Text>
  </TouchableOpacity>

    </View>

    <View style={styles.form}>

      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>

   </View>
    );

  }
  const styles = StyleSheet.create({

    containerp: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 5,
      margin:5,
    },
    labelp: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0066cc',
    },


    container: {
      flex: 1,
      alignItems: 'center',
       justifyContent: 'center',
      marginTop: 20,
    },
    form: {
      width: '80%',
      marginTop: 400,
    },
    label: {
      marginTop: 20,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
    },
    button: {
      backgroundColor: '#1E90FF',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom:30,
      // justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    avatarContainer: {
      marginTop: 0,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    changeAvatarButton: {
      marginTop: 0,
    },
    changeAvatarButtonText: {
      color: '#1E90FF',
      fontSize: 18,
    },
  });
  


  export default Account;
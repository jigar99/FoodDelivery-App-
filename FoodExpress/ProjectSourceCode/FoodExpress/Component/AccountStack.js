import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import {createStackNavigator} from '@react-navigation/stack';
import Account from "./Account";
import UpdateAccount from "./UpdateAccount";
import CardFormScreen from './CardFormScreen';
import RatingScreen from "./RatingScreen";
const Stack = createStackNavigator();
const AccountStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Account">
    {/* SplashScreen which will come once for 5 Seconds */}
    <Stack.Screen
      name="Account"
      component={Account}
    
      options={{headerShown: false}}
    />
    {/* Auth Navigator which includer Login Signup will come once */}
    <Stack.Screen
      name="UpdateAccount"
      component={UpdateAccount}
      options={{headerShown: true}}
      
    />

  <Stack.Screen
      name="Payment"
      component={CardFormScreen}
      options={{headerShown: true}}
      
    /> 
    <Stack.Screen
      name="Rating"
      component={RatingScreen}
      options={{headerShown: true}}
      
    />  
    {/* Navigation Drawer as a landing page */}
  </Stack.Navigator>

   // <SearchScreen/>
  );
};

export default AccountStack;
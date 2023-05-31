import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchScreen from "./SearchScreen"
import ResultsShowScreen from './ResultsShowScreen';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const Search = (props) => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
    {/* SplashScreen which will come once for 5 Seconds */}
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      // Hiding header for Splash Screen
      options={{headerShown: false}}
    />
    {/* Auth Navigator which includer Login Signup will come once */}
    <Stack.Screen
      name="ResultsShowScreen"
      component={ResultsShowScreen}
      options={{headerShown: false}}
    />
    {/* Navigation Drawer as a landing page */}
  </Stack.Navigator>

   // <SearchScreen/>
  );
};

export default Search;
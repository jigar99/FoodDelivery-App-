/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {createStackNavigator} from '@react-navigation/stack';
import OrderDelivery from './Component/OrderDelivery'
import CardFormScreen from './Component/CardFormScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import {RecoilRoot} from 'recoil';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Account from './Component/Account';
 import  Home from './Component/Home'
 import Search from './Component/Search';
 
 import AccountStack from './Component/AccountStack';

 import SplashScreen from './Component/SplashScreen';
import LoginScreen from './Component/LoginScreen';
import RegisterScreen from './Component/RegisterScreen';
import Restaurant from './Component/Restaurant';

// function Home() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>That we didn't copy professor!</Text>
//     </View>
//   );
// }



function Profile() {
  return (
    <View  style={styles.container}>
     {/* {Account} */}
     <FlatList
        data={[
          {key: 'Profile'},
          {key: 'Logout'},
        ]}
        renderItem={({item}) => 

        <View><Text style={styles.item}>{item.key}</Text><View style={styles.bottomView}></View></View>
        // <Text style={styles.item}>{item.key}</Text>
      }
      />
    </View>
  );
}

function Order() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order!</Text>
    </View>
  );
}

// function Search() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Search!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

const MyTabs = (props) => {  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
  //   <NavigationContainer>
  //   <MyTabs />
  //  </NavigationContainer>


  <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator which includer Login Signup will come once */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />  
        <Stack.Screen name="Restaurant" component={Restaurant}  options={{headerShown: false}} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} options={{headerShown: false}}/>
        {/* Navigation Drawer as a landing page */}
      </Stack.Navigator>
    </NavigationContainer>
  </RecoilRoot>
  
  );
};

const Stack = createStackNavigator();
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerShown : false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex : 1,
    justifyContent : 'center',
    backgroundColor : '#fffff',
    alignItems : 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundColors : {
    backgroundColor : '#9FA8DA',
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
   bottomView : {
     height : 1,
     backgroundColor : '#9FA8DA',
     paddingBottom : 0,
   }
});

export default App;

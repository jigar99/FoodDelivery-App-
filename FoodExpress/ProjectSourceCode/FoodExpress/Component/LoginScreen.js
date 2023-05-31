
// Import React and Component
import React, {useState, createRef,useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useRecoilState} from 'recoil'

import {currentUserState} from '../atoms/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhonenumber] = useState(0);
  const [userFirst, setUserFirst] = useState('');
  const [userLast, setUserLast] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [jsnon,setjson] = useState({email: null ,first :null,last:null,phoneNo:null});
  const [recoilCurrentUser, setRecoilCurrentUser] = useRecoilState(currentUserState);


  const passwordInputRef = createRef();


  useEffect(() => {
      const storeData = async () => {
        try {
          // if (jsnon.email !== null){
            console.log({jsnon});
            console.log("STORE DATA USE_EFFECT");
            await AsyncStorage.setItem('@email', JSON.stringify(jsnon.email));
          //}
            await AsyncStorage.setItem('@phoneNo',  JSON.stringify(jsnon.phoneNo));
            await AsyncStorage.setItem('@user_name', userName);
            await AsyncStorage.setItem('@firstName', JSON.stringify(jsnon.first));
            await AsyncStorage.setItem('@lastName', JSON.stringify(jsnon.last));
        } catch (err) {
          console.log('Error in Login: ', err);
        }
      };
      storeData();
      setRecoilCurrentUser((prevData) => ({
        ...prevData,
        firstName: jsnon.first,
        lastName: jsnon.last,
      }))
    console.log({recoilCurrentUser})
  }, [jsnon]);

  const handleSubmitPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    if (reg.test(userEmail) === false) {
      alert('enter valid email address');
      return;
    }
  
    navigation.navigate('MyTabs')
     setLoading(true);
   
    let dataToSend = 
    JSON.stringify({
      email: userEmail,
      password: userPassword});
      console.log(dataToSend);
      //aws sucks
    fetch('http://ec2-18.209.179.66.compute-1.amazonaws.com:8080/FoodExpressApplication/foodexpressuser/login', {
      method: 'POST',
      body:  dataToSend,
      headers: {
        //Header Defination
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status.statusResponse == "Success") {
          if (responseJson.userDetailsList != null) {
            try {
              console.log(userName+"kkmkm");
              // alert('Data successfully saved')
            } catch (e) {
            // alert('Failed to save the data to the storage')
            }
            // setjson(responseJson.userDetailsList[0]);
            console.log(responseJson.userDetailsList[0]);
            setjson((prevData) => ({
              ...prevData,
              email: responseJson.userDetailsList[0].email,
              phoneNo: responseJson.userDetailsList[0].phoneNumber,
              first: responseJson.userDetailsList[0].firstName,
              last: responseJson.userDetailsList[0].lastName,
            }));
            setUserName(responseJson.userDetailsList[0].firstName + ' ' + responseJson.userDetailsList[0].lastName )
            // setUserFirst(responseJson.userDetailsList[0].firstName) 
            // setUserLast(responseJson.userDetailsList[0].lastName)
            // setUserPhonenumber(responseJson.userDetailsList[0].phoneNumber)
            // setUserEmail(responseJson.userDetailsList[0].email)
          }
         navigation.navigate('MyTabs')
        } else {
          // setErrortext('Please check your email id or password');
          // console.log('Please check your email id or password');
          // alert(responseJson.status.responseMessage);
          return;
          
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        //console.error(error);
      });
   };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              {/* <Image
                source={require('../images/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }} */}
                <Text style={{
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  bottom : 20,
                  alignContent: 'center',
                  color : 'white',
                  fontWeight: 'bold',
                  fontSize:50
                  
                }}> Food Express</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

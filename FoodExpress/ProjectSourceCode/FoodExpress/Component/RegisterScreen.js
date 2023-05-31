
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Loader from './Loader';

const RegisterScreen = (props) => {
  const [userFirst, setUserFirst] = useState('');
  const [userLast, setUserLast] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const FirstnameInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const lastInputRef = createRef();
  const passwordRef = createRef();



  const handleSubmitButton = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regP = /^[@#](?=.{7,13}$)(?=\w{7,13})(?=[^aeiou_]{7,13})(?=.*[A-Z])(?=.*\d)/;
    let regPhone = /.?(\\d{3}).*(\\d{3}).*(\\d{4})/;
    setErrortext('');
    if (!userFirst) {
      alert('Please fill First Name');
      return;
    }
    if (!userLast) {
      alert('Please fill Last Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
     if (reg.test(userEmail) === false) {
      alert('enter valid email address');
      return;
    } 
  
    if (!userPhoneNumber) {
      alert('Please fill PhoneNumber');
      return;
    }

    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    if (userPhoneNumber.length != 10 ){
      alert('enter valid phoneNumber');
      return;
    }

    //Show Loader
    let dataToSend = 
    JSON.stringify({
      firstName: userFirst,
      lastName: userLast,
      email: userEmail,
      areaCode : 1,
      phoneNumber : userPhoneNumber,
      password: userPassword});
      setLoading(true);
      console.log(dataToSend);
      fetch('http://ec2-18.209.179.66.compute-1.amazonaws.com:8080/FoodExpressApplication/foodexpressuser/register', {
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
        if (responseJson.statusResponse == "Success") {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          //setErrortext('Registration Unsuccessful');
          alert(responseJson.responseMessage);
          return;
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
   };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          {/* <Image
            source={require('../assets/images/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          /> */}

         <Text style={{
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  bottom : 0,
                  alignContent: 'center',
                  color : 'white',
                  fontWeight: 'bold',
                  fontSize:25
                  
            }}> Food Express</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userFirst) => setUserFirst(userFirst)}
              underlineColorAndroid="#f000"
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                FirstnameInputRef.current && FirstnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />          
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userLast) => setUserLast(userLast)}
              underlineColorAndroid="#f000"
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={lastInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                lastInputRef.current && lastInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}z
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPhoneNumber) => setUserPhoneNumber(userPhoneNumber)}
              underlineColorAndroid="#f000"
              placeholder="Enter PhoneNumber"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={phoneNumberInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
          <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('LoginScreen')}>
              Login
            </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});

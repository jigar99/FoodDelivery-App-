import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/user'


const UpdateAccount = ({navigation})  => {
 
  
      const [input, setInput] = useState('');
  
      const [first, setFirst] = useState('');
      const [loading, setLoading] = useState(false);
      const [errortext, setErrortext] = useState('');
      const [last, setLast] = useState('');
      const [email, setEmail] = useState('');
      const [emailNew, setEmailNew] = useState('');
      const [phoneNo, setphoneNo] = useState(0);
      const [userName, setUserName] = useState('');
      const [jsnon,setjson] = useState({email: null ,first :null,last:null,phoneNo:null});
      const [flag, setFlag] = useState(false);
      const [recoilCurrentUser, setRecoilCurrentUser] = useRecoilState(currentUserState);

      useEffect(() => {
        if (flag) {
            const storeData = async () => {
                try {
                  // if (jsnon.email !== null){
                    console.log({jsnon});
                    console.log("STORE DATA USE_EFFECT");
                    await AsyncStorage.setItem('@email', JSON.stringify(jsnon.email));
                  //}
                    await AsyncStorage.setItem('@phoneNo',  JSON.stringify(jsnon.phoneNo));
                    // await AsyncStorage.setItem('@user_name', userName);
                    await AsyncStorage.setItem('@firstName', JSON.stringify(jsnon.first));
                    await AsyncStorage.setItem('@lastName', JSON.stringify(jsnon.last));
                } catch (err) {
                  console.log('Error in Login: ', err);
                }
              };
              storeData();
              setFlag(false)
              setRecoilCurrentUser((prevData) => ({
                ...prevData,
                firstName: jsnon.first,
                lastName: jsnon.last,
              }))
              navigation.pop();
        }
        
    },[jsnon]);


    useEffect(() => {
        const storeData = async () => {
          try {
              await AsyncStorage.setItem('@user_name', userName);
            
          } catch (err) {
            console.log('Error in Login: ', err);
          }
        };
        storeData();
    }, [userName]);

    useEffect(() => {
        const user = async () => {
        try {
          const value = await AsyncStorage.getItem("@email");
          const value1= await AsyncStorage.getItem('@phoneNo');
          const value3 = await AsyncStorage.getItem('@firstName');
          const value4 = await AsyncStorage.getItem('@lastName');  
          
   
         const data  = JSON.parse(value);
         const data1  = JSON.parse(value1);
        //  const data2  = JSON.parse(value2);
         const data3  = JSON.parse(value3);
         const data4  = JSON.parse(value4);

           console.log({value});
          if (data||data1||data3||data4) {
              // We have data!!
              console.log("--888--");
              console.log({value});
              setEmail(data);
              setEmailNew(data);
              setFirst(data3);
              setLast(data4);
              setphoneNo(data1.toString());
              
          }
       } catch (error) {
          // Error retrieving data
          console.log("---00");
       }
      };
      user();
      }, []);

  const handleSubmit = () => {
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regP = /^[@#](?=.{7,13}$)(?=\w{7,13})(?=[^aeiou_]{7,13})(?=.*[A-Z])(?=.*\d)/;
    let regPhone = /.?(\\d{3}).*(\\d{3}).*(\\d{4})/;
    setErrortext('');
    if (!first) {
      alert('Please fill First Name');
      return;
    }

    if (!last) {
      alert('Please fill Last Name');
      return;
    }
    if (!emailNew) {
      alert('Please fill Email');
      return;
    }
     if (reg.test(emailNew) === false) {
      alert('enter valid email address');
      return;
    } 
  
    // if (!userPhoneNumber) {
    //   alert('Please fill PhoneNumber');
    //   return;
    // }


    if (phoneNo.length != 10 ){
      alert('enter valid phoneNumber');
      return;
    }


    setErrortext('');
   
     setLoading(true);

    const dataToSend = 
    JSON.stringify({
      newEmail : emailNew,
      email: email,
      firstName: first,
      lastName:last,
      phoneNumber:phoneNo,
    });
      console.log(dataToSend);
      //aws sucks  ec2-18-234-107-170
    fetch('http://ec2-18.209.179.66.compute-1.amazonaws.com:8080/FoodExpressApplication/foodexpressuser/update', {
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
            setFlag(true);
            console.log('lsls');
            setjson((prevData) => ({
                ...prevData,
                email: responseJson.userDetailsList[0].email,
                phoneNo: responseJson.userDetailsList[0].phoneNumber,
                first: responseJson.userDetailsList[0].firstName,
                last: responseJson.userDetailsList[0].lastName,
              }));

            setUserName(responseJson.userDetailsList[0].firstName + ' ' + responseJson.userDetailsList[0].lastName ) 
           
          }
        } else {
           alert(responseJson.status.responseMessage);
          return;
          
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
   };
  

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Profile</Text>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First"
          value={first}
          onChangeText={setFirst}
        />

      <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last"
          value={last}
          onChangeText={setLast}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={emailNew}
          onChangeText={setEmailNew}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput  
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phoneNo}
          onChangeText={setphoneNo}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    paddingTop:0,
    marginTop:0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop:0,
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  h2:{
    fontSize:40,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UpdateAccount;
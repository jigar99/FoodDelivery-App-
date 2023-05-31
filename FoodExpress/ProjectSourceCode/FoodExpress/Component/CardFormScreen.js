import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRecoilState } from "recoil";
import { userPayment } from '../atoms/userPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { json } from 'express/lib/response';

const CardFormScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(true);
  const [jsnon,setjson] = useState({cardNumber: null ,cardHolderName :null,expiryDate:null,cvv:null,paymentComplete:null});
  const [flag, setFlag] = useState(false);
  const [recoilCurrentUser, setRecoilCurrentUser] = useRecoilState(userPayment);
  const [isFlag, setiSFlag] = useState(true);

  const validateCardNumber = () => {
    const regex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    if (cardNumber === '') {
      alert('Please enter a card number');
    // } else if (!regex.test(cardNumber)) {
    //   alert('Please enter a valid card number');
     }
     else {
      return true;
    }
  };

  const validateCardHolderName = () => {
    const regex = /^[a-zA-Z ]+$/;
    if (cardHolderName === '') {
      alert('Please enter a cardholder name');
    } else if (!regex.test(cardHolderName)) {
      alert('Please enter a valid cardholder name');
    } else {
      return true;
    }
  };

  const validateExpiryDate = () => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (expiryDate === '') {
      alert('Please enter an expiry date');
    } else if (!regex.test(expiryDate)) {
      alert('Please enter a valid expiry date (MM/YY)');
    } else {
      return true;
    }
  };

  const validateCvv = () => {
    const regex = /^[0-9]{3,4}$/;
    if (cvv === '') {
      alert('Please enter a CVV');
    } else if (!regex.test(cvv)) {
      alert('Please enter a valid CVV');
    } else {
      return true;
    }
  };

  const handlePayment = async () => {
    // Handle payment logic here
    console.log("0900");
    if (validateCardNumber() && validateCardHolderName() && validateExpiryDate() && validateCvv()) {
      setFlag(true);
      setjson((prevData) => ({
        ...prevData,
        cardNumber: cardNumber,
        cardHolderName: cardHolderName,
        expiryDate: expiryDate,
        cvv: cvv,
        paymentComplete: true
      }));

      setRecoilCurrentUser((prevData) => ({
        ...prevData,
        cardNumber: cardNumber,
        cardHolderName: cardHolderName,
      }))
      setPaymentComplete(true);
      //console.log({jsnon});
    } 
    
  };

  useEffect(() => {
    if (flag) {
        const storeData = async () => {
            try {
              // if (jsnon.email !== null){
                console.log({jsnon});
                console.log("STORE DATA USE_EFFECT--");
                await AsyncStorage.setItem('@cardNumber', JSON.stringify(jsnon.cardNumber));
                await AsyncStorage.setItem('@cardHolderName',  JSON.stringify(jsnon.cardHolderName));
                await AsyncStorage.setItem('@cvv', JSON.stringify(jsnon.cvv));
                await AsyncStorage.setItem('@expiryDate', JSON.stringify(jsnon.expiryDate));
                await AsyncStorage.setItem('@paymentComplete', JSON.stringify(jsnon.paymentComplete));
            } catch (err) {
              console.log('Error in Login: ', err);
            }
          };
          storeData();
          setFlag(false);
          setiSFlag(false);
          navigation.pop();
        }
},[jsnon]);

  useEffect(() => {
    console.log("wdwdjwijid");
    const user = async () => {
    try {
      const value = await AsyncStorage.getItem('@cardNumber');
      const value1= await AsyncStorage.getItem('@cardHolderName');
      const value3 = await AsyncStorage.getItem('@expiryDate');
      const value4 = await AsyncStorage.getItem('@cvv');  
      const value5 = await AsyncStorage.getItem('@paymentComplete');
     const data  = JSON.parse(value);
     const data1  = JSON.parse(value1);
     const data3  = JSON.parse(value3);
     const data4  = JSON.parse(value4);
     const data5  = JSON.parse(value5);
     console.log(value1);
      if (data||data1||data3||data4||data5) {
          setCardNumber(data);
          setCardHolderName(data1);
          setExpiryDate(data3);
          setCvv(data4);
          setPaymentComplete(data5);
          setiSFlag(false);
      }
   } catch (error) {
      // Error retrieving data
      console.log("---00");
   }
  };
  user();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      {paymentComplete && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handlePayment}>
          {isFlag && (
          <Text style={styles.buttonText}>Add Payment</Text>
        )
        }

        {!isFlag &&(
          <Text style={styles.buttonText}>Update Payment</Text>
        )}

           
          </TouchableOpacity>
        </View>
      )}
      {/* {paymentComplete && (
        <View style={styles.paymentCompleteContainer}>
          <Text style={styles.paymentCompleteText}>Payment Complete!</Text>
          <Text style={styles.savedDetailsText}>Card Number: {cardNumber}</Text>
          <Text style={styles.savedDetailsText}>Cardholder Name: {cardHolderName}</Text>
          <Text style={styles.savedDetailsText}>Expiry Date: {expiryDate}</Text>
          <Text style={styles.savedDetailsText}>CVV: {cvv}</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  paymentCompleteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCompleteText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  savedDetailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CardFormScreen;

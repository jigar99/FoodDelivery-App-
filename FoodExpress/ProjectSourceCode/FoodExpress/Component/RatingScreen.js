import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RatingScreen = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isFlag, setFlag] = useState(true);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    // Save the rating and review to AsyncStorage
    try {
      await AsyncStorage.setItem('rating', rating.toString());
      await AsyncStorage.setItem('review', review);
    } catch (error) {
      console.error(error);
    }

    alert('Thank you for your valuable feedback');
    navigation.pop();
  };

  useEffect(() => {
    const readData = async () => {
      try {
        console.log("Inside READ")
        const value = await AsyncStorage.getItem("rating");
        const value1 = await AsyncStorage.getItem("review");
        console.log({value});
        if (value !== null && value1 !== null) {
            setRating(value);
            setReview(value1);
            setFlag(false);
        }
      } catch (e) {
        //alert('Failed to fetch the input from storage');
      }
    };
    readData();
  },[]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Rate Food Express Application</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handleRating(value)}>
            <AntDesign name={value <= rating ? 'star' : 'staro'} size={40} color="gold" />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Write a review..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 }}
        value={review}
        onChangeText={(text) => setReview(text)}
        multiline
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
        onPress={handleSubmit}
        disabled={!rating || !review}
      >
        {isFlag && (
         <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Submit</Text>
        )
        }

        {!isFlag &&(
         <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Resubmit Review</Text>
        )}

      </TouchableOpacity>
    </View>
  );
};

export default RatingScreen;

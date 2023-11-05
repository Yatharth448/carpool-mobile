import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const PayGateway = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedCardName, setSelectedCardName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction?command=getJsonData&access_code=AVFT28KK38AF01TFFA',
        );
        console.log(response, 'ccAvenue response');
        // setJsonData(response.data);
      } catch (error) {
        console.error('An error occurred!', error);
        Alert.alert('An error occurred! Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleCardNameChange = cardName => {
    setSelectedCardName(cardName);
    // Perform further actions based on the selected card name
    // For example: set some state variables or make additional API calls
  };

  return (
    <View>
      <Picker
        selectedValue={selectedCardName}
        onValueChange={itemValue => handleCardNameChange(itemValue)}>
        <Picker.Item label="Select" value="" />
        {jsonData.map((value, index) => (
          <Picker.Item
            key={index}
            label={value.cardName}
            value={value.cardName}
          />
        ))}
      </Picker>
    </View>
  );
};

export default PayGateway;

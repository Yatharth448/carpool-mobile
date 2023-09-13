import moment from 'moment';
import { Alert } from 'react-native';
export const convertToKms = (val) => {

  const km = Number(val) / 1000;
  return String(km.toFixed(1) + " km")

}

export const calculatedJourneyEndTime = (startTime, approxTime) => {


  let finishTime = new Date(startTime)
  let newDate = new Date(finishTime.getTime() + approxTime * 1000)
  return (moment(newDate).format('HH:mm'))


}

export const alertWithNav = (title = '', message, okPress) => {
  //function to make three option alert
  Alert.alert(
    //title
    title,
    //body
    message,
    [
      {
        text: 'Cancel', onPress: () => console.log('Yes Pressed')
      },
      {
        text: 'OK', onPress: okPress
      },
    ],
    { cancelable: true },
  );
};

export const CalculateTimeFromMilies = (milies) => {

  // Calculate hours and remaining seconds
  const hours = Math.floor(milies / 3600);
  const remainingSeconds = milies % 3600;

  // Calculate minutes from the remaining seconds
  const minutes = Math.floor(remainingSeconds / 60);
  return (`${hours} hours ${minutes} minutes`)

}
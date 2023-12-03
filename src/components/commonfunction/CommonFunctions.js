import moment from 'moment';
import { Alert, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
export const convertToKms = (val) => {

  const km = Number(val) / 1000;
  return String(km.toFixed(1) + " km")

}

export const calculatedJourneyEndTime = (startTime, approxTime) => {


  let finishTime = new Date(startTime)
  let newDate = new Date(finishTime.getTime() + approxTime * 1000)
  return (moment(newDate).format('HH:mm'))


}


export const calculatedJourneyDuration = (approxTime) => {

  // Calculate hours and remaining seconds
  const hours = Math.floor(approxTime / 3600);
  const remainingSeconds = approxTime % 3600;

  // Calculate minutes from the remaining seconds
  const minutes = Math.floor(remainingSeconds / 60);
  return (`${hours}h${minutes}m`)


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


export const SetupKeyboard = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText("Done");
    KeyboardManager.setToolbarManageBehaviourBy("subviews"); // "subviews" | "tag" | "position"
    KeyboardManager.setToolbarPreviousNextButtonEnable(false);
    KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
    KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setKeyboardAppearance("default"); // "default" | "light" | "dark"
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
    KeyboardManager.resignFirstResponder();
    KeyboardManager.isKeyboardShowing()
      .then((isShowing) => {
        // ...
      });
  }
}
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import {AppColors} from '../constants/AppColor';
import {AppFontFamily} from '../constants/AppFonts';
import CommonLoaders from '../loader/Loader';
export const RaiseIssueModal = ({visible, onClose, onSubmit}) => {
  const [issue, setIssue] = React.useState('');
  // const carArray = [{ 'value': '1', 'label': 'Tata Nexon' }, { 'value': '2', 'label': 'MG Hector' }]
  React.useEffect(() => {
    // console.log('se', selectedIdType)
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onClose(!visible);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={styles.modalView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: AppColors.themeCardBorderColor,
            }}>
            <View>
              <Image
                source={require('../../assets/raise_issue.png')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontFamily: AppFontFamily.PopinsSemiBold,
                  fontSize: 20,
                  color: '#333',
                }}>
                Raise Issue
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: AppColors.themeTextGrayColor,
                borderRadius: 50,
                padding: 8,
                marginLeft: 'auto',
              }}
              onPress={() => onClose(!visible)}>
              <Image
                source={require('../../assets/close.png')}
                style={{
                  width: 15,
                  height: 15,
                }}
              />
            </Pressable>
          </View>
          <View>
            <TextInput
              textAlignVertical="top"
              value={issue}
              multiline
              numberOfLines={4}
              autoFocus={true}
              onChangeText={text => setIssue(text)}
              placeholder="Please provide detailed information about the issue you are facing."
              placeholderTextColor={AppColors.themeTextGrayColor}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              borderTopWidth: 1,
              borderColor: AppColors.themeCardBorderColor,
              paddingTop: 10,
            }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose(!visible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                if (onSubmit) {
                  onSubmit(issue);
                }
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {},
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  buttonOpen: {
    backgroundColor: AppColors.themePrimaryColor,
  },
  buttonClose: {
    backgroundColor: AppColors.themeTextGrayColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

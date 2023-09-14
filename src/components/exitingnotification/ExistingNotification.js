import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MyComponent extends React.Component {
  state = {
    existingData: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
    }
  };

  // Function to calculate text height based on the content
  measureTextHeight = (text) => {
    const { width } = StyleSheet.flatten(styles.text);
    const adjustedWidth = width * 0.8; // Adjust for the 80% width
    const numberOfLines = Math.ceil(text.length * 10 / adjustedWidth); // Approximation
    const lineHeight = 12; // Adjust based on your text style
    return numberOfLines * lineHeight;
  }

  render() {
    const { text } = this.state.existingData;
    const textHeight = this.measureTextHeight(text);

    return (
      <View style={styles.container}>
        <View style={[styles.notification, { minHeight: textHeight }]}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* Your ButtonPrimary component */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  notification: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    width: '90%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Helvetica', // Adjust to your font family
  },
  buttonContainer: {
    width: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;



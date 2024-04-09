import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 65, // Adjust height as needed
    width: width*0.9, // Take entire width
    borderRadius: 10, // Border radius for rounded corners
    backgroundColor: '#EA6C13', // Orange background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Text font size
    // Text font weight
  },
});

export default CustomButton;

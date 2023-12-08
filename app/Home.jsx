// Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Camera } from 'expo-camera';

const Home = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await requestCameraPermission();
      setHasPermission(cameraPermission);
    })();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs camera permission to take pictures.',
          buttonPositive: 'O',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openCamera = () => {
    if (hasPermission) {
      navigation.navigate('Camera');
    } else {
      alert('Camera permission not granted');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>QR Scanner 🔎</Text>
      
      <Text style={styles.heading}>Welcome to My First React Native App!</Text>
      <Text style={styles.description}>
        Hello there! 👋 This is my first React Native project, created as a practice to explore the world of mobile app development. 
        As a budding developer, I've embarked on this journey to gain hands-on experience and apply my skills in building real-world applications.
      </Text>
      <Text style={styles.description}>
        This simple app allows you to interact with the device's camera and explore basic features. 
        I've included functionalities like opening the camera, flipping between front and back views, and even scanning QR codes!
      </Text>
      <Text style={styles.description}>
        While this app may be modest in its features, it marks the beginning of my coding adventures. 
        I'm excited about the possibilities that lie ahead, and I'll continue learning and creating to improve my skills and bring more exciting projects to life.
      </Text>
      <Text style={styles.thankYou}>Thank you for exploring my first app! 🚀</Text>
   
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open  📸</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
    backgroundColor: 'black',
  },
  text1: {
    width:'100%',
    marginTop:"10%",
    color: 'white',
    fontSize: 24,
    textAlign:'left',
    marginBottom: 20,
    marginLeft: 30,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
  thankYou: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width:'35%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "#541FAB",
    border:'1px solid white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Home;

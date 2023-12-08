// CameraView.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Camera } from 'expo-camera';

const CameraView = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    
    Linking.openURL(data)
      .then(() => {
        console.log(`Opened URL: ${data}`);
       
      })
      .catch((error) => {
        console.error(`Error opening URL: ${data}`, error);
      });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera}
        type={type}
        ratio="16:9"
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
         <View style={styles.square} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.buttonText}>Flip 🔁</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'white',
    position: 'fixed',
    top: '30%',
    left: "23%",
  },
  buttonContainer: {
    width: '80%',
    left: 40,
    position: 'absolute',
    bottom:'1%',
    flex: 1,
    height:'100px',
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 10,
    padding: 10,
  },
  flipButton: {
    flex: 0.4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  backToHomeButton: {
    flex: 0.4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraView;

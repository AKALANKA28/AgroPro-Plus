import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        base64: true,
      });
      setCapturedImage(photo.uri);
      Alert.alert('Image Captured', 'Image has been captured successfully!');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.preview}
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.off}
          />
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <Text style={styles.captureText}>Capture</Text>
          </TouchableOpacity>
          {capturedImage && (
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setCameraVisible(false)}>
            <Text style={styles.closeText}>Close Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.cropButton} onPress={() => setCameraVisible(true)}>
          <Text style={styles.cropButtonText}>Open Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  capturedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  cropButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  cropButtonText: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 14,
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  captureText: {
    color: '#000',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CameraComponent;

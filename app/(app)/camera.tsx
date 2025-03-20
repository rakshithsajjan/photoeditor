import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [type, setType] = React.useState<CameraType>(CameraType.back);
  const cameraRef = React.useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setIsReady(status === 'granted');
      } catch (err) {
        console.error('Error requesting camera permission:', err);
      }
    })();
  }, []);

  if (!permission || !isReady) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={[styles.permissionText, { color: '#fff' }]}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: 'Camera Access',
            headerShown: true,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.permissionText}>We need your permission to use the camera</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraType = () => {
    setType(current => current === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePicture = async () => {
    if (!cameraRef.current || !isReady) {
      console.warn('Camera is not ready');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
        exif: false,
      });
      
      if (photo.base64) {
        router.push({
          pathname: '/edit',
          params: { imageUri: photo.uri, base64Data: photo.base64 }
        });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Take Photo',
          headerShown: true,
        }}
      />
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}
        ratio="16:9"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  flipButton: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButtonInner: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
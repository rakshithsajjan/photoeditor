import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface CameraButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const CameraButton: React.FC<CameraButtonProps> = ({ onPress, disabled = false }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}>
    <Ionicons name="camera" size={32} color="peachpuff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CameraButton;

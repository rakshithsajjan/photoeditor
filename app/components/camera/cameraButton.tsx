import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface CameraButtonProps {
  onPress: () => void;
  disabled?: boolean;
  buttonColor?: string;
  iconColor?: string;
  size?: number;
}

export const CameraButton: React.FC<CameraButtonProps> = ({
  onPress,
  disabled = false,
  buttonColor = '#2196F3',
  iconColor = 'peachpuff',
  size = 80,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled && styles.disabled,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: buttonColor,
      },
    ]}
    onPress={onPress}
    disabled={disabled}>
    <Ionicons name="camera" size={size * 0.4} color={iconColor} />
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

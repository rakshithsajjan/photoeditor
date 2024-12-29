import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface CameraButtonProps {
  onPress: () => void;
  disabled?: boolean;
  size?: number;
}

export const CameraButton: React.FC<CameraButtonProps> = ({
  onPress,
  disabled = false,
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
      },
    ]}
    onPress={onPress}
    disabled={disabled}>
    {/* <Ionicons name="camera" size={size * 0.4} /> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'peachpuff',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CameraButton;

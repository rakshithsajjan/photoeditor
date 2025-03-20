import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface ImageActionButtonsProps {
  onRetake: () => void;
  onAdd: () => void;
  onContinue: () => void;
}

export const ImageActionButtons: React.FC<ImageActionButtonsProps> = ({
  onRetake,
  onAdd,
  onContinue,
}) => (
  <View style={styles.container}>
    {/* retake */}
    <TouchableOpacity style={styles.button} onPress={onRetake}>
      <Ionicons name="refresh" size={28} color="#FFF" />
    </TouchableOpacity>
    {/* add */}
    <TouchableOpacity style={styles.button} onPress={onAdd}>
      <Ionicons name="add" size={28} color="#FFF" />
    </TouchableOpacity>
    {/* continue */}
    <TouchableOpacity style={styles.button} onPress={onContinue}>
      <Ionicons name="checkmark" size={28} color="#FFF" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 40,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageActionButtons;

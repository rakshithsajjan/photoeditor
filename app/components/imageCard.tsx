import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 2;
const CARD_WIDTH = (SCREEN_WIDTH - (CARDS_PER_ROW + 1) * CARD_MARGIN * 2) / CARDS_PER_ROW;

interface CapturedImageCardProps {
  imageUri: string;
  onRemovePress?: (imageUri: string) => void;
}

export const ImageCard: React.FC<CapturedImageCardProps> = ({ imageUri, onRemovePress }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      {onRemovePress && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemovePress(imageUri)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close-circle" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    margin: CARD_MARGIN,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default ImageCard;

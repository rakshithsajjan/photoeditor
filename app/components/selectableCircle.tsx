import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, ImageSourcePropType } from 'react-native';

import { TYPOGRAPHY } from '../styles/typography';

interface SelectableCircleProps {
  label: string;
  //   imageSource: ImageSourcePropType;
  selected: boolean;
  onSelect: (label: string) => void;
  size?: number;
  multiSelect?: boolean;
}

export const SelectableCircle: React.FC<SelectableCircleProps> = ({
  label,
  //   imageSource,
  selected,
  onSelect,
  size = 100,
  multiSelect = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: size, height: size },
        selected && styles.selectedContainer,
      ]}
      onPress={() => onSelect(label)}
      activeOpacity={0.7}>
      {/* <Image
        source={imageSource}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="cover"
      /> */}
      <View style={[styles.labelContainer, { width: size }]}>
        <Text style={[TYPOGRAPHY.selectableCircle, styles.label]}>{label}</Text>
      </View>
      {selected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark" size={24} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    margin: 4,
    position: 'relative',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  image: {
    borderRadius: 50,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    textAlign: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
  },
});

export default SelectableCircle;

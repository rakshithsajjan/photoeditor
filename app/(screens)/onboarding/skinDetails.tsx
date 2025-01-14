import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  // SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Header } from '../../components/Header';
import InstructionText from '../../components/camera/instructionText';
import { SelectableCircle } from '../../components/selectableCircle';
import { TYPOGRAPHY } from '../../styles/typography';

const windowWidth = Dimensions.get('window').width;

// Define skin types and concerns data
const skinTypes = [
  { label: 'Dry' }, // image: require('../assets/skin-types/dry.png') },
  { label: 'Normal' }, // image: require('../assets/skin-types/normal.png') },
  { label: 'Oily' }, // image: require('../assets/skin-types/oily.png') },
  { label: 'Combination' }, // image: require('../assets/skin-types/combination.png') },
  { label: 'Acne' }, // image: require('../assets/skin-types/acne.png') },
  { label: 'Not sure' }, // image: require('../assets/skin-types/not-sure.png') },
];

const skinConcerns = [
  { label: 'Acne Scars' }, // image: require('../assets/skin-concerns/acne-scars.png') },
  { label: 'Black/White Heads' }, // image: require('../assets/skin-concerns/blackheads.png') },
  { label: 'Dark Undereyes' }, // image: require('../assets/skin-concerns/dark-undereyes.png') },
  { label: 'Dullness' }, // image: require('../assets/skin-concerns/dullness.png') },
  { label: 'Hyper-Pigmentation' }, // image: require('../assets/skin-concerns/hyperpigmentation.png') },
  { label: 'Roughness' }, // image: require('../assets/skin-concerns/roughness.png') },
  { label: 'Large Pores' }, // image: require('../assets/skin-concerns/large-pores.png') },
  { label: 'Sensitivity' }, // image: require('../assets/skin-concerns/sensitivity.png') },
  { label: 'Wrinkles' }, // image: require('../assets/skin-concerns/wrinkles.png') },
];

export const SkinDetails: React.FC = () => {
  // const navigation = useNavigation();
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const handleSkinTypeSelect = (label: string) => {
    setSelectedSkinType(label);
  };

  const handleConcernSelect = (label: string) => {
    setSelectedConcerns((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      return [...prev, label];
    });
  };

  const handleContinue = () => {
    if (!selectedSkinType) {
      // Show error message or alert
      return;
    }

    router.push({
      pathname: '/(screens)/onboarding/skinProducts',
      // state: {
      //   skinType: selectedSkinType,
      //   skinConcerns: selectedConcerns,
      // },
    });
  };

  return (
    <>
      <Header title="ClearlyYou" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* <Text style={[TYPOGRAPHY.heading2, styles.question]}>What's your skin type?</Text> */}
        <InstructionText message="What's your skin type?" />
        <View style={styles.optionsContainer}>
          {skinTypes.map((type) => (
            <SelectableCircle
              key={type.label}
              label={type.label}
              // imageSource={type.image}
              selected={selectedSkinType === type.label}
              onSelect={handleSkinTypeSelect}
              size={windowWidth * 0.25}
            />
          ))}
        </View>

        <InstructionText message="What's your skin concern?" />
        <View style={styles.optionsContainer}>
          {skinConcerns.map((concern) => (
            <SelectableCircle
              key={concern.label}
              label={concern.label}
              // imageSource={concern.image}
              selected={selectedConcerns.includes(concern.label)}
              onSelect={handleConcernSelect}
              size={windowWidth * 0.25}
              multiSelect
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF6B6B',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleContinue}
          disabled={!selectedSkinType}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  question: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SkinDetails;

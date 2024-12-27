/* eslint-disable import/order */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../../styles/typography';

interface InstructionTextProps {
  message?: string;
}

export const InstructionText: React.FC<InstructionTextProps> = ({ message }) => (
  <Text style={styles.instruction}>{message}</Text>
);

const styles = StyleSheet.create({
  instruction: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    paddingHorizontal: 20,
    // marginVertical: 8,
    marginTop: 20,
    color: '#565656',
  },
});

export default InstructionText;

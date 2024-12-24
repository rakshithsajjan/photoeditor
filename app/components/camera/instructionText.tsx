/* eslint-disable import/order */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { typography } from '../../styles/typography';

interface InstructionTextProps {
  message: string;
}

export const InstructionText: React.FC<InstructionTextProps> = ({ message }) => (
  <Text style={styles.instruction}>{message}</Text>
);

const styles = StyleSheet.create({
  instruction: {
    ...typography.body,
    textAlign: 'center',
    paddingHorizontal: 16,
    color: '#FFFFFF',
  },
});
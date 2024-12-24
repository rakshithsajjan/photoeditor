/* eslint-disable import/order */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';

export const Header: React.FC = () => <Text style={styles.header}>ClearlyYou</Text>;

const styles = StyleSheet.create({
  header: {
    ...typography.heading1,
    textAlign: 'center',
    marginVertical: 20,
  },
});

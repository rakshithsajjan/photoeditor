/* eslint-disable import/order */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TYPOGRAPHY from '../styles/typography';

interface HeaderProps {
  title: string;
}
export const Header: React.FC<HeaderProps> = ({ title }) => (
  <Text style={styles.header}>{title}</Text>
);

const styles = StyleSheet.create({
  header: {
    ...TYPOGRAPHY.heading1,
    textAlign: 'center',
    // marginVertical: 20,
    marginTop: 60,
  },
});

export default Header;

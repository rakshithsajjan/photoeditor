import { StyleSheet } from 'react-native';

export const TYPOGRAPHY = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#565656',
    letterSpacing: 0.5,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#565656',
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    color: '#565656',
  },
  selectableCircle: {
    fontSize: 10,
    fontWeight: 'normal',
    lineHeight: 12,
  },
});

export default TYPOGRAPHY;

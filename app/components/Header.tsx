/* eslint-disable import/order */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import TYPOGRAPHY from '../styles/typography';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  isOnboarded?: boolean;
  userName?: string;
  streak?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isOnboarded = false,
  userName = 'kitten',
  streak = 0,
}) => {
  const handleProfileClick = () => {
    router.navigate('/(screens)/profileScreen');
  };
  if (!isOnboarded) {
    return <Text style={styles.simpleHeader}>{title}</Text>;
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.userIcon} onPress={handleProfileClick} >
        <Ionicons name="person-outline" size={24} color="#565656" />
      </TouchableOpacity>

      <Text style={[TYPOGRAPHY.heading1, styles.title]}>{title}</Text>

      <View style={styles.streakContainer}>
        <Ionicons name="flame" size={24} color="#FF6B6B" />
        <Text style={styles.streakText}>{streak}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  simpleHeader: {
    ...TYPOGRAPHY.heading1,
    textAlign: 'center',
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    // marginVertical: 8,
    marginTop: 32,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  streakText: {
    ...TYPOGRAPHY.heading2,
    color: '#565656',
  },
});

export default Header;

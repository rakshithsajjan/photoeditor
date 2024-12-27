import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

import { TYPOGRAPHY } from '../styles/typography';

// ProfileHeader Component
const ProfileHeader = () => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => router.push('/home')} style={styles.headerIcon}>
      <Ionicons name="chevron-down" size={24} color="#565656" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerIcon}>
      <Ionicons name="settings-outline" size={24} color="#565656" />
    </TouchableOpacity>
  </View>
);

// ProfileCard Component
const ProfileCard = ({
  icon,
  label,
  rightText,
  showChevron = true,
  onPress,
}: {
  icon: string;
  label: string;
  rightText?: string;
  showChevron?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardLeft}>
      <Ionicons size={24} color="#565656" style={styles.cardIcon} />
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
    <View style={styles.cardRight}>
      {rightText && <Text style={styles.cardValue}>{rightText}</Text>}
      {showChevron && <Ionicons name="chevron-forward" size={20} color="#565656" />}
    </View>
  </TouchableOpacity>
);

interface ProfileScreenProps {
  route?: {
    params?: {
      userId?: string;
    };
  };
}

export default function ProfileScreen({ route }: ProfileScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      {/* Profile Avatar and Info */}
      <View style={styles.profileSection}>
        <Image source={require('../../assets/adaptive-icon.png')} style={styles.avatar} />
        <Text style={[TYPOGRAPHY.heading1, styles.displayName]}>Butterfly</Text>
        <Text style={styles.handle}>kitten.butterfly</Text>
      </View>

      {/* Profile Cards */}
      <View style={styles.cardsContainer}>
        <ProfileCard icon="bookmark-outline" label="Skin goal" onPress={() => {}} />
        <ProfileCard
          icon="medal-outline"
          label="SkinAura points"
          rightText="45,325"
          showChevron={false}
        />
        <ProfileCard icon="flame-outline" label="Streaks" onPress={() => {}} />
        <ProfileCard icon="hourglass-outline" label="Progress" onPress={() => {}} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ClearlyYou v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 32,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
  },
  displayName: {
    marginBottom: 4,
  },
  handle: {
    ...TYPOGRAPHY.body,
    color: '#565656',
    opacity: 0.8,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    width: 24,
  },
  cardLabel: {
    ...TYPOGRAPHY.body,
    color: '#565656',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardValue: {
    ...TYPOGRAPHY.body,
    color: '#565656',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: '#565656',
    opacity: 0.6,
  },
});

import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { Header } from '../components/Header';
import { LogsCard, RoutineCard, ProductsCard } from '../components/home/homeCards';
// import { InfoCard } from '../../components/home/InfoCard';
// import { ProductsCard } from '../../components/home/ProductsCard';
// import { RoutineCard } from '../../components/home/RoutineCard';
import { WeekCalendar } from '../components/home/weekCalendar';
import { TYPOGRAPHY } from '../styles/typography';

export default function HomeTab() {
  const morningRoutine = [
    'Cleanse with gentle foam',
    'Apply vitamin C serum',
    'Moisturize with daily cream',
    'Apply sunscreen',
  ];

  const nightRoutine = ['Double cleanse', 'Apply retinol', 'Use night cream', 'Apply eye cream'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="ClearlyYou" isOnboarded userName="kitten" streak={69} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <WeekCalendar />

          <View style={styles.cardsContainer}>
            <LogsCard completed={2} total={3} />

            <RoutineCard
              morningSteps={[
                'Cleanse with gentle foam',
                'Apply vitamin C serum',
                'Moisturize with daily cream',
                'Apply sunscreen',
              ]}
              nightSteps={['Double cleanse', 'Apply retinol', 'Use night cream', 'Apply eye cream']}
              onPress={() => {
                /* Handle routine details */
              }}
            />

            <ProductsCard
              products={[
                'Gentle Foam Cleanser - Contains: Glycerin, Ceramides',
                'Vitamin C Serum - 15% L-Ascorbic Acid',
                'Moisturizer - Hyaluronic Acid, Peptides',
              ]}
              onPress={() => {
                /* Handle products details */
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
});

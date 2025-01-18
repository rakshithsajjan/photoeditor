import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { Header } from '~/app/components/Header';
import { LogsCard, RoutineCard, ProductsCard } from '~/app/components/home/homeCards';
// import { InfoCard } from '../../components/home/InfoCard';
// import { ProductsCard } from '../../components/home/ProductsCard';
// import { RoutineCard } from '../../components/home/RoutineCard';
import { WeekCalendar } from '~/app/components/home/weekCalendar';
import { TYPOGRAPHY } from '~/app/styles/typography';
import { useSkinRoutine } from '~/app/utils/skinRoutine';
// debug
import { StorageHelper } from '~/app/backend/storage';

export default function HomeTab() {
  const { skinRoutine } = useSkinRoutine();

  // DEBUG
  const debugStorage = async () => {
    const userData = await StorageHelper.getUserData();
    console.log('Current storage data:', userData);
  };

  useEffect(() => {
    debugStorage();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="ClearlyYou" isOnboarded userName="kitten" streak={69} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <WeekCalendar />

          <View style={styles.cardsContainer}>
            <LogsCard completed={2} total={3} />

            <RoutineCard
              isMorning
              steps={
                skinRoutine?.morningRoutine.map(
                  (step) => `${step.stepname}: ${step.description}`
                ) ?? []
              }
            />
            <RoutineCard
              isMorning={false}
              steps={
                skinRoutine?.nightRoutine.map((step) => `${step.stepname}: ${step.description}`) ??
                []
              }
            />

            {/* <ProductsCard
              products={[
                'Gentle Foam Cleanser - Contains: Glycerin, Ceramides',
                'Vitamin C Serum - 15% L-Ascorbic Acid',
                'Moisturizer - Hyaluronic Acid, Peptides',
              ]}
              onPress={() => {}}
            /> */}
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

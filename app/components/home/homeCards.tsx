import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TYPOGRAPHY } from '../../styles/typography';

// Base Card component for consistent styling
const BaseCard: React.FC<{
  children: React.ReactNode;
  style?: any;
}> = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;

// Logs Card Component
export const LogsCard: React.FC<{
  completed: number;
  total: number;
}> = ({ completed, total }) => (
  <BaseCard>
    <Text style={[TYPOGRAPHY.heading2]}>Logs left</Text>
    <View style={styles.logsCounter}>
      <Text style={styles.logsText}>
        {completed}/{total}
      </Text>
    </View>
  </BaseCard>
);

// Routine Card Component
export const RoutineCard: React.FC<{
  steps?: string[];
  isMorning: boolean;
  onPress?: () => void;
}> = ({ steps, isMorning, onPress }) => (
  <BaseCard>
    <TouchableOpacity onPress={onPress}>
      <Text style={[TYPOGRAPHY.heading2, styles.cardTitle]}>Routine</Text>

      <View style={styles.routineSection}>
        <Text style={styles.routineTitle}>{isMorning ? 'Morning routine' : 'Night routine'}</Text>
        {steps?.map((step, index) => (
          <View key={`morning-${index}`} style={styles.routineStep}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.routineText}>{step}</Text>
          </View>
        ))}
      </View>

      {onPress && (
        <View style={styles.expandButton}>
          <Ionicons name="chevron-forward" size={20} color="#565656" />
        </View>
      )}
    </TouchableOpacity>
  </BaseCard>
);

// Products Card Component
export const ProductsCard: React.FC<{
  products: string[];
  onPress?: () => void;
}> = ({ products, onPress }) => (
  <BaseCard>
    <TouchableOpacity onPress={onPress}>
      <Text style={[TYPOGRAPHY.heading2, styles.cardTitle]}>My skin products</Text>

      <View style={styles.productsContainer}>
        {products.map((product, index) => (
          <View key={`product-${index}`} style={styles.productItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.productText}>{product}</Text>
          </View>
        ))}
      </View>

      {onPress && (
        <View style={styles.expandButton}>
          <Ionicons name="chevron-forward" size={20} color="#565656" />
        </View>
      )}
    </TouchableOpacity>
  </BaseCard>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 12,
  },
  // Logs Card Styles
  logsCounter: {
    backgroundColor: '#FFF3E0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  logsText: {
    ...TYPOGRAPHY.heading2,
    color: '#565656',
  },
  // Routine Card Styles
  routineSection: {
    marginBottom: 16,
  },
  nightSection: {
    marginBottom: 0,
  },
  routineTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  routineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 8,
  },
  routineText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  // Products Card Styles
  productsContainer: {
    marginTop: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  productText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  // Shared Styles
  bulletPoint: {
    ...TYPOGRAPHY.body,
    marginRight: 8,
    color: '#565656',
  },
  expandButton: {
    position: 'absolute',
    right: 0,
    top: 16,
  },
});

export default {
  LogsCard,
  RoutineCard,
  ProductsCard,
};

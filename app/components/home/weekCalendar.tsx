import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TYPOGRAPHY } from '../../styles/typography';

export const WeekCalendar: React.FC = () => {
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 3 + i); // Center today
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' })[0],
      date: date.getDate(),
      isToday: i === 3,
      isPast: i < 3,
    };
  });

  return (
    <View style={styles.calendar}>
      {weekDays.map((day, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            day.isToday && styles.todayContainer,
            day.isPast && styles.pastDay,
          ]}>
          <Text style={[styles.dayText, day.isPast && styles.pastDayText]}>{day.day}</Text>
          <Text style={[styles.dateText, day.isPast && styles.pastDayText]}>{day.date}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dayContainer: {
    alignItems: 'center',
    width: 40,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayContainer: {
    backgroundColor: '#FFF3E0',
  },
  dayText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    fontWeight: '600',
  },
  pastDay: {
    opacity: 0.5,
  },
  pastDayText: {
    color: '#A0A0A0',
  },
});

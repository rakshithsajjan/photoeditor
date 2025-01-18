import AsyncStorage from '@react-native-async-storage/async-storage';

import { userStorage } from '~/app/backend/types';

const USER_STORAGE_KEY = '@user';

const initialUserData: userStorage = {
  isOnboarded: false,
  streakCount: 0,
  skinRoutine: null,
};

export const StorageHelper = {
  initialize: async () => {
    try {
      const existingData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!existingData) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(initialUserData));
      }
    } catch (error) {
      console.error('Error initializing storage:', error);
      throw error;
    }
  },

  getUserData: async (): Promise<userStorage> => {
    try {
      const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return data ? JSON.parse(data) : initialUserData;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  },

  updateUserData: async (newData: Partial<userStorage>) => {
    try {
      const currentData = await StorageHelper.getUserData();
      const updatedData = { ...currentData, ...newData };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  },

  updateStreakCount: async (newCount: number) => {
    return StorageHelper.updateUserData({ streakCount: newCount });
  },
};

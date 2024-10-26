import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

// Define the type for userData
type UserData = {
  name: string;
  phone: string;
  medicalData: string;
  emergencyContact: string;
};

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null); // Specify type for userData
  const [fontsLoaded] = useFonts({
    'Syne': require('../assets/fonts/Syne-Medium.ttf'),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data !== null) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name}</Text>

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{userData.phone}</Text>

          <Text style={styles.label}>Medical Data:</Text>
          <Text style={styles.value}>{userData.medicalData}</Text>

          <Text style={styles.label}>Emergency Contact:</Text>
          <Text style={styles.value}>{userData.emergencyContact}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>No user data available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0B2A43',
  },
  title: {
    fontFamily: 'Syne',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1D0511',
    borderRadius: 10,
  },
  label: {
    fontFamily: 'Syne',
    fontSize: 18,
    color: '#CCCCCC',
    marginTop: 10,
  },
  value: {
    fontFamily: 'Syne',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  noData: {
    fontFamily: 'Syne',
    fontSize: 18,
    color: '#FFFFFF',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

export default function UserForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [medicalData, setMedicalData] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Syne': require('../assets/fonts/Syne-Medium.ttf'),
  });

  const handleSubmit = async () => {
    try {
      const userData = { name, phone, medicalData, emergencyContact };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      router.replace('./home'); // Navigate to home after submission
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#1D0511', '#0B2A43']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>User Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#FFFFFF99"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#FFFFFF99"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Medical Data"
          placeholderTextColor="#FFFFFF99"
          value={medicalData}
          onChangeText={setMedicalData}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Emergency Contact"
          placeholderTextColor="#FFFFFF99"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 160,
  },
  formContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Syne',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Syne',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#121123',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 70,
    height: 90,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Syne',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

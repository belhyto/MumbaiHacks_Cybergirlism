import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';

const StartJourney = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [contact, setContact] = useState<Contacts.Contact | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);
    })();
  }, []);

  const startTrackingLocation = async () => {
    // Start tracking live location
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10, // in meters
        timeInterval: 5000, // in milliseconds
      },
      (newLocation) => {
        setLocation(newLocation);
        console.log('New location:', newLocation);
      }
    );
  };

  const shareJourney = async () => {
    // Get contacts
    const { data } = await Contacts.getContactsAsync();
    if (data.length > 0) {
      const selectedContact = data[0]; // Select the first contact for demo
      setContact(selectedContact);

      // Notify the contact about the journey
      Alert.alert(
        'Share Journey',
        `Would you like to share your journey with ${selectedContact.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // For demo purposes, we simply show an alert
              Alert.alert('Journey Shared!', `Shared with ${selectedContact.name}`);
              // Here you could integrate a calling or messaging functionality
            },
          },
        ]
      );
    } else {
      Alert.alert('No contacts found.');
    }
  };

  const alertUser = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alert!',
        body: 'Something happened during your journey!',
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start Your Journey</Text>
      {location ? (
        <Text style={styles.locationText}>
          Your current location: {JSON.stringify(location.coords)}
        </Text>
      ) : (
        <Text style={styles.waitingText}>Waiting for location...</Text>
      )}
      <Button title="Start Tracking Location" onPress={startTrackingLocation} color="#6200ee" />
      <Button title="Share Journey" onPress={shareJourney} color="#6200ee" />
      <Button title="Trigger Alert" onPress={alertUser} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Match with the other screens' background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Match the text color with other screens
  },
  locationText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  waitingText: {
    fontSize: 16,
    color: '#888', // Optional: different color for waiting text
  },
});

export default StartJourney;

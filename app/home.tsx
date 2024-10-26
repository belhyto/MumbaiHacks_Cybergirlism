import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
    const router = useRouter();

    const handleStartJourney = () => {
        router.push('/startJourney'); // Update with the actual path to the Start Journey screen
    };

    const handleUpdateDetails = () => {
        router.push('/form'); // Navigate to the Update Details (form) screen
    };

    const handleProfile = () => {
        router.push('/profile'); // Navigate to the Profile page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Be safe and select an option</Text>

            <TouchableOpacity style={styles.button1} onPress={handleStartJourney}>
                <Text style={styles.buttonText}>Start Journey</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleUpdateDetails}>
                <Text style={styles.buttonText}>Update Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleProfile}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 160, // Match padding to UserForm
        backgroundColor: '#1D0511', // Match background gradient color
    },
    header: {
        fontSize: 28,
        fontFamily: 'Syne',
        color: '#FFFFFF', // Match text color
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        
        backgroundColor: '#121123', // Dark background for button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
    },
    button1: {

        backgroundColor: '#121123', // Dark background for button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderColor: '#04EAD7',
        borderWidth: 2,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        
    },
    buttonText: {
        fontFamily: 'Syne',
        color: '#FFFFFF',
        fontSize: 18,

       
    },
});

export default Home;

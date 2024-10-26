import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Define a type for the languages
type Language = 'English' | 'हिंदी' | 'বাংলা' | 'తెలుగు' | 'मराठी';

const languages = ['English', 'हिंदी', 'বাংলা', 'తెలుగు', 'मराठी', ];
const { width } = Dimensions.get('window');

export default function Index() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('English');
  const [fontsLoaded] = useFonts({
    'Syne': require('../assets/fonts/Syne-Medium.ttf'),
  });
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  const handleSwipe = () => {
    router.push('/form');
  };

  // Define translations
  const translations = {
    title: {
      English: "Welcome to Wolyf",
      हिंदी: "वोलाआइफ़ में आपका स्वागत है",
      বাংলা: "ওলিফে আপনাকে স্বাগতম",
      తెలుగు: "వోలిఫ్‌కు స్వాగతం",
      मराठी: "वोलाआइफ़ आपले स्वागत आहे"
    },
    tagline: {
      English: "Empowering women's safety across India",
      हिंदी: "भारत भर महिलाओं की सुरक्षा को सशक्त बनाना",
      বাংলা: "ভারত জুড়ে নারীর সুরক্ষা শক্তিশালীকরণ",
      తెలుగు: "భారతదేశం వ్యాప్తంగా మహిళల భద్రతను బలోపేত చేయడం",
      मराठी: "भारतभर महिलांच्या सुरक्षेला बळकटी देणे"
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#1D0511', '#0B2A43']}
        style={styles.container}
      >
        <Image source={require('../assets/images/logo_big.png')} style={styles.logo} />
        <Text style={styles.title}>{translations.title[currentLanguage]}</Text>
        <Text style={styles.tagline}>{translations.tagline[currentLanguage]}</Text>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => {
            const currentIndex = languages.indexOf(currentLanguage);
            const nextIndex = (currentIndex + 1) % languages.length;
            setCurrentLanguage(languages[nextIndex] as Language); // Cast to Language type
          }}
        >
          <Text style={styles.languageButtonText}>
            Language: {currentLanguage}
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Swipeable
            renderRightActions={() => <View style={{ width: width / 2 }} />}
            onSwipeableRightOpen={handleSwipe}
          >
            <TouchableOpacity style={styles.getStartedButton} onPress={handleSwipe}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
              <Text style={styles.arrowIcon}>➔</Text>
            </TouchableOpacity>
          </Swipeable>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Syne',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'Syne',
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
  },
  languageButton: {
    backgroundColor: '#323A4F',
    padding: 10,
    borderRadius: 5,
  },
  languageButtonText: {
    fontFamily: 'Syne',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  getStartedButtonText: {
    fontFamily: 'Syne',
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginLeft: 5,
  },
});

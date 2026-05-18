import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Replace 'reset' with navigate if you want back-button to return to splash
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 2500);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Replace with your actual logo */}
      <Image
        source={require('../../assets/icons/ic_smartunifoliologo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Smart Unifolio</Text>
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color="#2e5eab"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 140,
    marginBottom: 16,
  },
  // appName: {
  //   fontSize: 28,
  //   fontWeight: '700',
  //   color: '#2e5eab',
  //   letterSpacing: 1,
  // },
  loader: {
    marginTop: 40,
  },
});

export default SplashScreen;
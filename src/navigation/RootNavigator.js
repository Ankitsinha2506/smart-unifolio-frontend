import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../auth/screens/SplashScreen';
import HomeScreen from '../user/screens/HomeScreen';
import ProductDetailScreen from '../user/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='ProductDetail'
        component={ProductDetailScreen}
        options={{
          animation: 'slide_from_right',  // iOS-style push
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HotstarHomeScreen from './screens/HotstarHomeScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);



  return (
    <SafeAreaView style={styles.safe}>
      <HotstarHomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0E1A' },
});

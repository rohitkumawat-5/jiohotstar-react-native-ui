import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Easing,
  StatusBar,
} from 'react-native';

/**
 * SPLASH LOGO
 * -----------
 * Drop your own logo file into /assets and point LOGO_SOURCE at it, e.g.:
 *
 *   const LOGO_SOURCE = require('../assets/splash-logo.png');
 *
 * Leave it as null to use the built-in animated wordmark below.
 * (Avoid hotlinking Google image-search thumbnail URLs — they expire,
 *  block hotlinking, and won't render reliably inside the app.)
 */
const LOGO_SOURCE = null;

const COLORS = {
  bgTop: '#0F1B3D',
  bgBottom: '#050912',
  accent: '#1F80E0',
  text: '#FFFFFF',
  subtext: '#9AA6C0',
};

export default function SplashScreen({ onFinish, duration = 2000 }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;
  const shine = useRef(new Animated.Value(0)).current;
  const exitFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle pulsing glow behind the mark
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shine, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shine, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();

    // Hold for `duration`, fade out, then hand off to the home screen
    const timer = setTimeout(() => {
      Animated.timing(exitFade, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => onFinish && onFinish());
    }, duration);

    return () => {
      clearTimeout(timer);
      loop.stop();
    };
  }, []);

  const glowScale = shine.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const glowOpacity = shine.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.05] });

  return (
    <Animated.View style={[styles.root, { opacity: exitFade }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgBottom} />

      {/* simple two-tone backdrop (no extra gradient package needed) */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <View style={styles.center}>
        <Animated.View
          style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
        />

        <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center' }}>
          {LOGO_SOURCE ? (
            <Image source={LOGO_SOURCE} style={styles.logoImage} resizeMode="contain" />
          ) : (
            <>
              <View style={styles.markCircle}>
                <Text style={styles.markStar}>✦</Text>
              </View>
              <Text style={styles.wordmark}>
                Star<Text style={{ color: COLORS.accent }}>Stream</Text>
              </Text>
              <Text style={styles.tagline}>Movies · Series · Live Sports</Text>
            </>
          )}
        </Animated.View>
      </View>

      <Animated.Text style={[styles.footer, { opacity: fade }]}>
        Loading your watchlist…
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.bgBottom },
  bgTop: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%', backgroundColor: COLORS.bgTop },
  bgBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', backgroundColor: COLORS.bgBottom },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  glow: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: COLORS.accent,
  },

  logoImage: { width: 220, height: 90 },

  markCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(31,128,224,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(31,128,224,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  markStar: { fontSize: 34, color: COLORS.text },

  wordmark: { color: COLORS.text, fontSize: 32, fontWeight: '900', letterSpacing: 0.5 },
  tagline: { color: COLORS.subtext, fontSize: 12, marginTop: 8, letterSpacing: 1.2 },

  footer: {
    color: COLORS.subtext,
    fontSize: 11.5,
    textAlign: 'center',
    marginBottom: 40,
  },
});

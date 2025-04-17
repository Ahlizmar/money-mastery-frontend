import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { TYPOGRAPHY } from '../../styles/typography';
import { COLORS } from '../../styles/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.90;
const CARD_HEIGHT = verticalScale(130);

export default function SmartTipsCard() {
  const [smartTip, setSmartTip] = useState('Loading...');
  const [loading, setLoading] = useState(false);

  // Fetch a smart budgeting tip from the backend API
  const fetchSmartTip = async () => {
    setLoading(true);
    try {
        const response = await fetch('https://money-mastery-backend.onrender.com/api/insights', {        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spendingData: {
            Groceries: 200,
            Dining: 150,
            Entertainment: 100,
          },
        }),
      });

      const data = await response.json();
      const tips = data.tips || '';
      const firstTip = tips
        .split(/\d\.\s|•\s|-\s/)
        .filter(t => t.trim())[0];

      setSmartTip(firstTip ? firstTip.trim() : 'No tip available.');
    } catch (error) {
      console.error('Failed to fetch smart tip:', error);
      setSmartTip('Unable to load tip.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSmartTip();
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Decorative background circle */}
      <Image
        source={require('../../assets/cardCircle.png')}
        style={styles.circleImage}
        resizeMode="contain"
      />

      {/* Lightbulb icon */}
      <Image
        source={require('../../assets/LB.png')}
        style={styles.bulbImage}
        resizeMode="contain"
      />

      {/* Background card container */}
      <ImageBackground
        source={require('../../assets/cardShape.png')}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.textContainer}>
          <Text style={TYPOGRAPHY.sectionTitle}>Smart Tips</Text>
          <Text style={[TYPOGRAPHY.text, styles.tipText]}>
            {typeof smartTip === 'string' ? smartTip : 'Loading tip...'}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '111%',
    alignItems: 'center',
    marginBottom: verticalScale(13),
    position: 'relative',
  },
  circleImage: {
    position: 'absolute',
    top: -scale(0),
    left: '50%',
    transform: [{ translateX: -scale(53) }],
    zIndex: 2,
    width: scale(75),
    height: scale(75),
  },
  bulbImage: {
    position: 'absolute',
    top: scale(10),
    left: '40%',
    transform: [{ translateX: -scale(5) }],
    width: scale(50),
    height: scale(50),
    zIndex: 3,
  },
  card: {
    marginTop: scale(48),
    width: '100%',
    height: verticalScale(130),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(20),
  },
  cardImage: {
    resizeMode: 'stretch',
    borderRadius: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    marginRight: scale(30),
  },
  tipText: {
    textAlign: 'left',
    lineHeight: scale(20),
  },
});
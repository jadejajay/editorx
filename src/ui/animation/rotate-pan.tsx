/* eslint-disable max-lines-per-function */
import 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
export default function App() {
  const pressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  // function calculateRotationAngle(x: number, y: number) {
  //   'worklet';
  //   // Use Math.atan2 to calculate the angle in radians
  //   const radians = Math.atan2(y, x);

  //   // Convert radians to degrees
  //   const degrees = (radians * 180) / Math.PI;

  //   // Ensure the angle is in the range [0, 360)

  //   return `${degrees}deg`;
  // }

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${Math.atan2(offsetY.value, offsetX.value)}rad`,
      },
    ],
    backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
    scale: withTiming(pressed.value ? 1.2 : 1),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        {/* Top-left corner icon */}
        <Feather
          name="trash-2"
          size={24}
          color="red"
          style={styles.topLeftIcon}
        />
        <GestureDetector gesture={pan}>
          {/* Top-right corner icon */}
          <Feather
            name="rotate-cw"
            size={24}
            color="blue"
            style={styles.topRightIcon}
          />
        </GestureDetector>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    cursor: 'grab',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

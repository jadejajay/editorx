/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';

import { parseDate } from '@/core';

import { Text, TouchableOpacity } from '../core';

export const AnimatedInOut = ({
  text,
  state,
  onPress,
}: {
  text?: number;
  state?: boolean;
  onPress?: () => void;
}) => {
  const fadeInViewRef = useRef<Animatable.View | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  let date: string = '';
  if (text) {
    date = parseDate(text);
  }

  useEffect(() => {
    const fadeInAndOut = async () => {
      if (!isVisible) {
        setIsVisible(true);
        //@ts-ignore
        await fadeInViewRef.current.fadeIn(3000); // Fade in over 1 second
      }
    };

    fadeInAndOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
    const fadeInAndOut = async () => {
      if (isVisible) {
        // await new Promise((resolve) => !state && setTimeout(resolve, 2000)); // Wait for 2 seconds
        //@ts-ignore
        await fadeInViewRef.current.fadeOut(3000).then(
          () => setIsVisible(false) // Fade out over 1 second
        ); // Fade out over 1 second
      }
    };

    fadeInAndOut();
  }, [isVisible, state]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View
        //@ts-ignore
        ref={(ref) => (fadeInViewRef.current = ref)}
        style={{ alignItems: 'center', backgroundColor: 'red' }}
        // duration={2000}
      >
        <Text
          className="rounded-full px-4 py-0.5 text-xs font-extrabold"
          style={{
            backgroundColor: '#151E2766',
            color: '#fff',
          }}
        >
          {date}
        </Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

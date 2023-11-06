/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TouchableOpacity } from '../core';
import { Shadow } from './shadow';

type Props = {
  onClick?: () => void;
  index?: number;
  isSelected?: boolean;
  url?: string;
};
export const SmallCard = ({ onClick, index, isSelected, url }: Props) => {
  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Shadow
        style={[
          styles.container,
          isSelected ? { backgroundColor: '#86fbea' } : {},
        ]}
        className="justify-center rounded  bg-white dark:bg-black"
      >
        <Image
          key={index}
          source={{
            uri: url,
          }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </Shadow>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',

    margin: 4,
    width: 90,
    height: 120,
  },
});

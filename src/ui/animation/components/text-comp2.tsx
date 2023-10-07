import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Text } from 'react-native-svg';

export const TextCompSvg = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width="100%" height="100%" fill="blue" viewBox="0 0 50 50" {...props}>
    <Text
      x="-10%" // Center horizontally
      y="50%" // Center vertically
      fontSize="14"
      fill={color} // Text color
      stroke="blue" // Border color
      strokeWidth="1" // Border width
    >
      Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello,
      World!
    </Text>
    {/* <Rect x="0" y="0" width="100%" height="100%" fill={'red'} /> */}
  </Svg>
);

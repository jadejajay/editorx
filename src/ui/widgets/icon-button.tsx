import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

import { AnimatedButton } from '../animation/bounce-in-button';

type Props = {
  icon: React.ReactNode; // You can use any icon library (e.g., FontAwesome, Ionicons)
  badgeValue?: string | number;
  onPress: () => void;
  className?: string;
  title?: string;
};
export const IconButton = ({
  icon,
  badgeValue,
  onPress,
  className,
  title,
}: Props) => {
  return (
    <AnimatedButton onClick={onPress} anim="bounceIn">
      <View style={styles.container} className={className}>
        {icon}
        {badgeValue && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeValue}</Text>
          </View>
        )}
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -1,
    left: -1,
  },
  badgeText: {
    color: 'white', // Customize badge text color
    fontWeight: 'bold',
    backgroundColor: 'red', // Customize badge background color
    borderRadius: 100, // Adjust as needed for your design
    lineHeight: 6,
    fontSize: 6, // Customize badge text size
    padding: 1,
  },
  titleText: {
    fontSize: 9,
    marginTop: 2,
    lineHeight: 9,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

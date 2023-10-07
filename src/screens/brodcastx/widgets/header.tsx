import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { formatNumber } from '@/core';
import { Image, Text, View } from '@/ui';

type Props = {
  src: string;
  name: string;
  subscriber: number;
};
export const Header = ({ src, name, subscriber }: Props) => {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? 'white' : 'black';
  const subscribers = formatNumber(subscriber);
  const { goBack } = useNavigation();
  return (
    <View
      className="h-16 flex-row items-center justify-around p-2"
      style={[colorScheme === 'dark' ? styles.container : styles.container2]}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        onPress={() => goBack()}
        size={24}
        color={color}
      />
      <View className="flex-1 flex-row items-center pl-4">
        <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          {src && (
            <Image
              source={{ uri: src }}
              className="h-full w-full rounded-full"
            />
          )}
        </View>
        <View className="grow pl-3">
          <Text
            variant="md"
            className="w-52 font-bold text-slate-200"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text variant="sm" className="text-slate-300" numberOfLines={1}>
            {subscribers} subscribers
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons name="dots-vertical" size={24} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222e3c',
  },
  container2: {
    backgroundColor: '#60aae3',
  },
});

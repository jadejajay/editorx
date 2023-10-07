import React from 'react';
import { ActivityIndicator } from 'react-native';

import { NoData } from '../../icons';
import { Text } from '../text';
import { View } from '../view';
type Props = {
  isLoading: boolean;
};
export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View className="items-center justify-center overflow-hidden">
      {!isLoading ? (
        <View>
          <NoData />
          <Text className="pt-4 text-center">Sorry! No data found</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
});

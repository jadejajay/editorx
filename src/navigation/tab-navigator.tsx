import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { BroadCastX, EditorX, Settings, Style } from '@/screens';

import { FeedNavigator } from './feed-navigator';

export type TabParamList = {
  Style: undefined;
  FeedNavigator: undefined;
  Settings: undefined;
  Editorx: undefined;
  BroadCastX: { id: any };
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const Stack = createNativeStackNavigator<TabParamList>();

/**
 * Renders a tab navigator component.
 *
 * @return {ReactElement} The rendered tab navigator component.
 */
export const TabNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Style" component={Style} />
      <Stack.Screen name="FeedNavigator" component={FeedNavigator} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Editorx" component={EditorX} />
      <Stack.Screen name="BroadCastX" component={BroadCastX} />
    </Stack.Navigator>
  );
};

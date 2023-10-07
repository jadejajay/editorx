import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

export function GetSafeArea() {
  const insets = useSafeAreaInsets();
  return insets.top + insets.bottom;
}

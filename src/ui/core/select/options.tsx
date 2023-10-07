import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { type PressableProps } from 'react-native';

import { Modal } from '../modal';
import { Pressable } from '../pressable';
import { Text } from '../text';
import { View } from '../view';
import { Check } from './icons';

export type Option = { label: string; value: string | number; icon?: any };

type OptionsProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: string | number;
};

function keyExtractor(item: Option) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value }, ref) => {
    const height = options.length * 70 + 100;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const renderSelectItem = React.useCallback(
      ({ item }: { item: Option }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          icon={item.icon}
          selected={value === item.value}
          onPress={() => onSelect(item)}
        />
      ),
      [onSelect, value]
    );

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        // eslint-disable-next-line react-native/no-inline-styles
        backgroundStyle={{
          backgroundColor: isDark ? '#151E27' : '#60aae3',
        }}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
        />
      </Modal>
    );
  }
);

const Option = React.memo(
  ({
    icon,
    label,
    selected = false,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
    icon?: any;
  }) => {
    return (
      <Pressable
        className="flex-row items-center border-b-[1px] border-neutral-300 py-2 px-3 dark:border-charcoal-700"
        {...props}
      >
        {icon && (
          <View className="mx-4">
            <MaterialCommunityIcons name={icon} size={24} color="grey" />
          </View>
        )}
        <Text variant="md" className="flex-1 dark:text-charcoal-100 ">
          {label}
        </Text>
        {selected && <Check fill="fill-black dark:fill-white" />}
      </Pressable>
    );
  }
);

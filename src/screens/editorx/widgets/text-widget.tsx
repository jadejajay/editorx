import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { IconButton, View } from '@/ui';
type Props = {
  add: any;
  element: any;
  set: any;
  state: any;
};
// eslint-disable-next-line max-lines-per-function
export const TextWidget = ({ add, element, set, state }: Props) => {
  const { colorScheme } = useColorScheme();
  const themecolor = colorScheme === 'dark' ? 'white' : 'black';
  return (
    <View className="flex-row flex-wrap justify-between">
      <IconButton
        icon={<Ionicons name="eyedrop" size={20} color={themecolor} />}
        onPress={() => {
          add('Object1', 'text', {
            text: 'Hello world',
            writingDirection: 'rtl',
          });
        }}
        title="Color"
        className="my-1"
      />
      <IconButton
        icon={<Ionicons name="pencil-outline" size={20} color={themecolor} />}
        onPress={() => {}}
        title="Edit"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="alpha-a-box-outline"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {}}
        title="Fonts"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="text-shadow"
            size={20}
            color={themecolor}
          />
        }
        onPress={() => {}}
        title="Shadow"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="alpha-a-box"
            size={24}
            color={themecolor}
          />
        }
        onPress={() => {}}
        title="Background"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="bold" size={18} color={themecolor} />}
        onPress={() => {}}
        title="Bold"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="format-underline"
            size={20}
            color={themecolor}
          />
        }
        onPress={() => {}}
        title="Underline"
        className="my-1"
      />
      <IconButton
        icon={
          <MaterialCommunityIcons
            name="format-italic"
            size={20}
            color={themecolor}
          />
        }
        onPress={() => {}}
        title="Italic"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="text-height" size={20} color={themecolor} />}
        onPress={() => {}}
        title="Text-height"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="strikethrough" size={20} color={themecolor} />}
        onPress={() => {}}
        title="line-through"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="align-left" size={18} color={themecolor} />}
        onPress={() => {}}
        title="Text-left"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="align-center" size={18} color={themecolor} />}
        onPress={() => {}}
        title="Text-center"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="align-right" size={18} color={themecolor} />}
        onPress={() => {}}
        title="Text-right"
        className="my-1"
      />
      <IconButton
        icon={<FontAwesome name="align-justify" size={18} color={themecolor} />}
        onPress={() => {}}
        title="Text-justify"
        className="my-1"
      />
    </View>
  );
};

/* <TouchableOpacity
        onPress={() => {
          add('Object1', 'text', {
            text: 'Hello world',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#0ff',
                textShadowColor: 'rgba(0, 0, 255, 1)', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
          });
        }}
      >
    
      </TouchableOpacity> */
/* <TouchableOpacity
        onPress={() => {
          set({
            ...state,
            STATE: state.STATE.map((item: any) => {
              if (item.id === element.id) {
                item.properties = {
                  ...item.properties,
                  text: 'fuck the world',
                  fontWeight: 'bold',
                  fontSize: 8,
                  color: '#0ff',
                };
              }
              return item;
            }),
          });
        }}
      >
      <Text className="text-base">{element?.properties?.fontSize}</Text>
      </TouchableOpacity> */

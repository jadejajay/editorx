import React from 'react';

import type { TextComponentType } from '@/types';
import { Text, View } from '@/ui';

export const TextComp = ({
  props,
}: {
  props: TextComponentType['properties'];
}) => {
  return (
    <View className="">
      <Text
        style={{
          color: props?.color, //
          fontFamily: props?.fontFamily, //
          fontSize: props?.fontSize,
          fontStyle: props?.fontStyle, //  enum('normal', 'italic')
          fontWeight: props?.fontWeight, //  enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')
          fontVariant: props?.fontVariant, ////  [] enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums')
          letterSpacing: props?.letterSpacing, //
          lineHeight: props?.lineHeight, //
          textAlign: props?.textAlign, //  enum('auto', 'left', 'right', 'center', 'justify')
          textDecorationLine: props?.textDecorationLine, // enum('none', 'underline', 'line-through', 'underline line-through')
          textShadowColor: props?.textShadowColor,
          textShadowOffset: props?.textShadowOffset, //  object: {width?: number, height?: number}
          textShadowRadius: props?.textShadowRadius,
          textTransform: props?.textTransform,
          writingDirection: props?.writingDirection, // enum('auto', 'ltr', 'rtl')
          transform: props?.transform,
          backgroundColor: props?.backgroundColor,
          borderBottomColor: props?.borderBottomColor,
          borderBottomEndRadius: props?.borderBottomEndRadius,
          borderBottomLeftRadius: props?.borderBottomLeftRadius,
          borderBottomRightRadius: props?.borderBottomRightRadius,
          borderBottomStartRadius: props?.borderBottomStartRadius,
          borderBottomWidth: props?.borderBottomWidth,
          borderColor: props?.borderColor,
          borderEndColor: props?.borderEndColor,
          borderLeftColor: props?.borderLeftColor,
          borderLeftWidth: props?.borderLeftWidth,
          borderRadius: props?.borderRadius,
          borderRightColor: props?.borderRightColor,
          borderRightWidth: props?.borderRightWidth,
          borderStartColor: props?.borderStartColor,
          borderStyle: props?.borderStyle,
          borderTopColor: props?.borderTopColor,
          borderTopEndRadius: props?.borderTopEndRadius,
          borderTopLeftRadius: props?.borderTopLeftRadius,
          borderTopRightRadius: props?.borderTopRightRadius,
          borderTopStartRadius: props?.borderTopStartRadius,
          borderTopWidth: props?.borderTopWidth,
          borderWidth: props?.borderWidth,
          elevation: props?.elevation,
          opacity: props?.opacity,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

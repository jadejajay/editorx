import React from 'react';

import type { ImageComponentType } from '@/types';
import { Image, View } from '@/ui';

export const ImageComp = ({
  props,
}: {
  props: ImageComponentType['properties'];
}) => {
  //http://itekindia.com/dashboard/ford.jpg
  //https://images.unsplash.com/photo-1603775020644-eb8decd79994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80
  return (
    <View className="flex-1">
      <Image
        source={{
          uri: props.image,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: '100%',
          backfaceVisibility: props?.backfaceVisibility,
          borderBottomRightRadius: props?.borderBottomRightRadius,
          borderColor: props?.borderColor,
          borderRadius: props?.borderRadius,
          borderTopLeftRadius: props?.borderTopLeftRadius,
          borderTopRightRadius: props?.borderTopRightRadius,
          borderWidth: props?.borderWidth,
          opacity: props?.opacity,
          tintColor: props?.tintColor,
          transform: props?.transform,
          backgroundColor: props?.backgroundColor,
          borderBottomLeftRadius: props?.borderBottomLeftRadius,
          borderBottomWidth: props?.borderBottomWidth,
          borderLeftWidth: props?.borderLeftWidth,
          borderRightWidth: props?.borderRightWidth,
          borderTopWidth: props?.borderTopWidth,
        }}
        resizeMode={props?.resizeMode}
      />
    </View>
  );
};

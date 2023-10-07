/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import type {
  PanGestureHandlerGestureEvent,
  RotationGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  PanGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type { ImageComponentType, TextComponentType } from '@/types';

import { TouchableOpacity, View } from '../core';
import { AnimatedButton } from './bounce-in-button';
import { ImageComp, TextComp } from './components';

type Props = {
  item: TextComponentType | ImageComponentType;
  posX?: number;
  posY?: number;
  Width?: number;
  Height?: number;
  Rotation?: number;
  onDelete: () => void;
  moveUp: () => void;
  setWidget: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  setIsFocused: (rem: boolean) => void;
};
/**
 * Renders a draggable, resizable, and rotatable element.
 * @return {React.ReactElement} The rendered draggable, resizable, and rotatable element.
 */
const DraggableResizableRotatableElement = ({
  item,
  posX = 0,
  posY = 0,
  Width = 100,
  Height = 100,
  Rotation = 0,
  onDelete,
  moveUp,
  setWidget,
  isFocused,
  setIsFocused,
}: Props): React.ReactElement => {
  const translateX = useSharedValue(posX);
  const translateY = useSharedValue(posY);
  const width = useSharedValue(Width);
  const height = useSharedValue(Height);
  const rotation = useSharedValue(Rotation);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startX: number;
      startY: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (isFocused) {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      }
    },
  });

  // const resizeGestureHandler = useAnimatedGestureHandler<
  //   PanGestureHandlerGestureEvent,
  //   {
  //     startX: number;
  //     startY: number;
  //     startWidth: number;
  //     startHeight: number;
  //   }
  // >({
  //   onStart: (_, ctx) => {
  //     ctx.startWidth = width.value;
  //     ctx.startHeight = height.value;
  //   },
  //   onActive: (event, ctx) => {
  //     width.value = ctx.startWidth + event.translationX;
  //     height.value = ctx.startHeight + event.translationY;
  //   },
  // });

  const rotationGestureHandler = useAnimatedGestureHandler<
    RotationGestureHandlerGestureEvent,
    {
      startRotation: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.startRotation = rotation.value;
    },
    onActive: (event, ctx) => {
      if (isFocused) {
        rotation.value = ctx.startRotation + event.rotation;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}rad` },
      ],
      width: width.value,
      height: height.value,
    };
  });

  const handleFocus = () => {
    if (isFocused) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
    setWidget(item?.component);
  };

  return (
    <View style={[styles.container]}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: isFocused ? '#1234' : 'transparent',
              borderColor: isFocused ? 'yellow' : 'transparent',
              borderStyle: 'dashed',
              borderWidth: 1.5,
              padding: 10,
            },
          ]}
        >
          <Animated.View style={styles.pinchContainer}>
            <RotationGestureHandler onGestureEvent={rotationGestureHandler}>
              <Animated.View style={styles.rotationContainer}>
                {item?.component === 'image' ? (
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={handleFocus}
                  >
                    <ImageComp props={item?.properties} />
                  </TouchableOpacity>
                ) : item?.component === 'text' ? (
                  <AnimatedButton
                    onClick={handleFocus}
                    anim="rubberBand"
                    duration={1000}
                  >
                    <TextComp props={item?.properties} />
                  </AnimatedButton>
                ) : (
                  <View />
                )}
                {isFocused && (
                  <>
                    <HandleButton
                      width={width}
                      height={height}
                      rotation={rotation}
                      type="resize"
                      style={styles.actionButton}
                    />
                    <HandleButton
                      translateX={translateX}
                      translateY={translateY}
                      width={width}
                      height={height}
                      rotation={rotation}
                      type="drag"
                      style={styles.actionButton2}
                    />
                    {/* <HandleButton
                      translateX={translateX}
                      translateY={translateY}
                      width={width}
                      height={height}
                      rotation={rotation}
                      type="rotate"
                      style={styles.actionButton3}
                    /> */}
                    <TouchableOpacity
                      // onPress={removeObject}
                      style={styles.actionButton4}
                    >
                      <Fontisto
                        name="trash"
                        size={16}
                        color="black"
                        onPress={onDelete}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={removeObject}
                      style={styles.actionButton3}
                    >
                      <Fontisto
                        name="copy"
                        size={16}
                        color="black"
                        onPress={moveUp}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  pinchContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  rotationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  actionButton: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  actionButton2: {
    position: 'absolute',
    top: -30,
    right: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  actionButton3: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  actionButton4: {
    position: 'absolute',
    top: -30,
    left: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
});

export default DraggableResizableRotatableElement;

const HandleButton: React.FC<{
  translateX?: Animated.SharedValue<number>;
  translateY?: Animated.SharedValue<number>;
  width?: Animated.SharedValue<number>;
  height?: Animated.SharedValue<number>;
  rotation?: Animated.SharedValue<number>;
  type: 'drag' | 'resize' | 'rotate';
  style?: any;
}> = ({ translateX, translateY, width, height, rotation, type, style }) => {
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startX?: number;
      startY?: number;
      startWidth?: number;
      startHeight?: number;
      startRotation?: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX?.value;
      ctx.startY = translateY?.value;
      ctx.startWidth = width?.value;
      ctx.startHeight = height?.value;
      ctx.startRotation = rotation?.value;
    },
    onActive: (event, ctx) => {
      const deltaTranslateX =
        event.translationX * Math.cos(rotation?.value!) -
        event.translationY * Math.sin(rotation?.value!);
      const deltaTranslateY =
        event.translationX * Math.sin(rotation?.value!) +
        event.translationY * Math.cos(rotation?.value!);

      if (type === 'resize') {
        if (translateX) translateX.value = ctx.startX! + event.translationX;
        if (translateY) translateY!.value = ctx.startY! + event.translationY;
        if (width) width.value = ctx.startWidth! + deltaTranslateX;
        if (height) height.value = ctx.startHeight! + deltaTranslateY;
      } else if (type === 'drag') {
        if (translateX) translateX.value = ctx.startX! + event.translationX;
        if (translateY) translateY!.value = ctx.startY! + event.translationY;
      } else if (type === 'rotate') {
        if (width && height) {
          const x = event.translationX - width?.value / 2;
          const y = event.translationY - height?.value / 2;
          const rotateZ = Math.atan2(y, x);
          if (rotation) rotation.value = rotateZ;
        }
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={style}>
        {type === 'drag' ? (
          <Fontisto name="arrow-move" size={16} color="black" />
        ) : type === 'resize' ? (
          <Fontisto name="arrow-resize" size={16} color="black" />
        ) : (
          <Fontisto name="spinner-rotate-forward" size={16} color="black" />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

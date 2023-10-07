// /* eslint-disable max-lines-per-function */
// import { Feather } from '@expo/vector-icons';
// import React, { useRef, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from 'react-native-reanimated';

// type Props = {
//   isSelected2?: boolean;
//   setIsSelected2?: React.Dispatch<React.SetStateAction<boolean>>;
//   toggleWidget: (text: string) => void;
// };
// const MagicElement = ({ toggleWidget }: Props) => {
//   const translateX = useSharedValue(0);
//   const translateX2 = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const translateY2 = useSharedValue(0);
//   const [isSelected, setIsSelected] = useState(false);
//   const lastOffset = { x: 0, y: 0 };
//   const panRef = useRef(null);

//   const handleSelect = () => {
//     setIsSelected(!isSelected);
//   };
//   const onGestureEvent = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.lastOffset = { x: translateX.value, y: translateY.value };
//     },
//     onActive: (event, ctx) => {
//       translateX.value = ctx.lastOffset.x + event.translationX;
//       translateY.value = ctx.lastOffset.y + event.translationY;
//     },
//     onEnd: (event) => {
//       lastOffset.x += event.translationX;
//       lastOffset.y += event.translationY;
//     },
//   });
//   const onGestureEvent2 = useAnimatedGestureHandler({
//     onActive: (event) => {
//       translateX2.value = event.translationX;
//       translateY2.value = event.translationY;
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//     };
//   });
//   const animatedStyle2 = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           rotate: `${Math.atan2(translateX2.value, translateY2.value)}deg`,
//         },
//       ],
//     };
//   });

//   return (
//     <Animated.View
//       style={
//         isSelected
//           ? [styles.container, styles.selected, animatedStyle, animatedStyle2]
//           : styles.container
//       }
//     >
//       <PanGestureHandler onGestureEvent={onGestureEvent} ref={panRef}>
//         <Animated.View>
//           <TouchableOpacity onPress={handleSelect}>
//             <Text adjustsFontSizeToFit allowFontScaling style={styles.text}>
//               Hello, World!
//             </Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </PanGestureHandler>
//       {isSelected && (
//         <>
//           <Feather
//             onPress={() => toggleWidget('text')}
//             name="trash-2"
//             size={20}
//             color="red"
//             style={styles.topLeftIcon}
//           />
//           <PanGestureHandler onGestureEvent={onGestureEvent2} ref={panRef}>
//             <Animated.View>
//               <Feather
//                 name="rotate-cw"
//                 size={20}
//                 color="green"
//                 style={styles.topRightIcon}
//               />
//             </Animated.View>
//           </PanGestureHandler>
//         </>
//       )}
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//   },
//   selected: {
//     backgroundColor: '#c7dcfe44',
//   },
//   text: {
//     textAlign: 'center',
//   },

//   topLeftIcon: {
//     position: 'absolute',
//     top: -30,
//     left: -30,
//   },
//   topRightIcon: {
//     position: 'absolute',
//     top: -30,
//     right: -30,
//   },
//   bottomLeftIcon: {
//     position: 'absolute',
//     bottom: -30,
//     left: -30,
//   },
//   bottomRightIcon: {
//     position: 'absolute',
//     bottom: -30,
//     right: -30,
//   },
// });

// export default MagicElement;

// // const pan = Gesture.Pan()
// //   .onBegin(() => {
// //     pressed.value = true;
// //   })
// //   .onChange((event) => {
// //     offsetX.value = event.translationX;
// //     offsetY.value = event.translationY;
// //   })
// //   .onFinalize(() => {
// //     pressed.value = false;
// //   });

// // const animatedStyle = useAnimatedStyle(() => ({
// //   transform: [
// //     {
// //       translateX: offsetX.value,
// //       translateY: offsetY.value,
// //       // rotate: `${Math.atan2(offsetY.value, offsetX.value)}rad`,
// //     },
// //   ],
// //   backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
// //   scale: withTiming(pressed.value ? 1.2 : 1),
// // }));

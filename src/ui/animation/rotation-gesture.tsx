// import { Feather } from '@expo/vector-icons';
// import React from 'react';
// import { Animated, PanResponder, StyleSheet, View } from 'react-native';

// const RotatableBox = () => {
//   const [angle, setAngle] = React.useState(0);

//   // Create a pan responder for the rotate icon
//   const rotatePanResponder = React.useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         // Calculate the rotation angle based on the gesture's position (x, y)
//         const newAngle =
//           (Math.atan2(gestureState.dy, gestureState.dx) * 180) / Math.PI;
//         setAngle(newAngle);
//       },
//     })
//   ).current;

//   return (
//     <View style={styles.container}>
//       {/* Rotatable content */}
//       <Animated.View
//         style={[
//           styles.contentView,
//           {
//             transform: [{ rotate: `${angle}deg` }],
//           },
//         ]}
//       >
//         {/* Your rotatable content goes here */}
//         <Feather name="star" size={50} color="gold" />
//         {/* Rotate icon */}
//         <View style={styles.rotateIcon} {...rotatePanResponder.panHandlers}>
//           <Feather name="rotate-cw" size={24} color="blue" />
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentView: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'lightgray',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rotateIcon: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//   },
// });

// export default RotatableBox;

// import { Feather } from '@expo/vector-icons';
// import * as MediaLibrary from 'expo-media-library';
// import React, { useRef, useState } from 'react';
// import ViewShot from 'react-native-view-shot';

// import { BACKGROUNDS, FRAMES } from '@/api';
// import {
//   resolutions,
//   setAudioModalVisible,
//   setBackgroundModalVisible,
//   setElementsModalVisible,
//   setFrameModalVisible,
//   setInfoModalVisible,
//   setLayersModalVisible,
//   setShapesModalVisible,
//   setStickersModalVisible,
//   useEditorX,
// } from '@/core';
// import { EditingFeatures } from '@/core/editing-features';
// import useImagePicker from '@/core/hooks/use-image-picker';
// import type { BackgroundType, EditingFeaturesType, FrameType } from '@/types';
// import { Image, Text, View } from '@/ui';
// import DraggableResizableRotatableElement from '@/ui/animation/drag-resize-rotate';
// import { HorizontalList } from '@/ui/widgets/horizontal-list';
// import { IconButton } from '@/ui/widgets/icon-button';
// import { SmallCard } from '@/ui/widgets/small-card';

// import { ImageComp } from './components';
// import type { Props } from './editorx';
// import {
//   AudioWidget,
//   ElementsWidget,
//   ImageWidget,
//   InfoWidget,
//   LayersWidget,
//   ShapesWidget,
//   StickersWidget,
//   TextWidget,
// } from './widgets';
// import { BackgroundWidget } from './widgets/background-widget';
// import { FrameWidget } from './widgets/frame-widget';

// export const EditorX = ({}: Props) => {
//   //`http://itekindia.com/chats/frames/format1.png`
//   const [widget, toggleWidget] = useState<string>('background');
//   const BackGroundPicker = useImagePicker();
//   const FramePicker = useImagePicker();
//   const EmojiPicker = useImagePicker();
//   const viewShotRef = useRef(null);
//   const {
//     stickersModalVisible,
//     audioModalVisible,
//     infoModalVisible,
//     shapesModalVisible,
//     elementsModalVisible,
//     layersModalVisible,
//     backgroundModalVisible,
//     frameModalVisible,
//     resolution,
//   } = useEditorX();
//   const toggleWidgetModal = (item: string) => {
//     if (item === 'background') {
//       toggleWidget('background');
//     } else if (item === 'frames') {
//       toggleWidget('frames');
//     } else if (item === 'info') {
//       setInfoModalVisible(true);
//     } else if (item === 'text') {
//       toggleWidget('text');
//     } else if (item === 'stickers') {
//       setStickersModalVisible(true);
//     } else if (item === 'audio') {
//       setAudioModalVisible(true);
//     } else if (item === 'shape') {
//       setShapesModalVisible(true);
//     } else if (item === 'image') {
//       toggleWidget('image');
//     } else if (item === 'elements') {
//       setElementsModalVisible(true);
//     }
//   };

//   const STATE = [
//     {
//       component: 'emoji',
//       properties: {
//         image: EmojiPicker.imageUri,
//       },
//     },
//   ];

//   const captureView = async () => {
//     if (viewShotRef.current) {
//       //@ts-ignore
//       const result = await viewShotRef.current.capture();
//       // `result` will contain the captured image in PNG format
//       // console.log('captured', JSON.stringify({ result }));
//       const asset = await MediaLibrary.createAssetAsync(result);
//       const album = await MediaLibrary.createAlbumAsync('IBAIS Media', asset);
//       console.log('captured', JSON.stringify({ album }));
//     }
//   };

//   //height 200+40  StatusBar.currentHeight
//   //width 4
//   return (
//     <View className="flex-1 justify-between">
//       <View className="flex-1">
//         <View
//           style={{
//             width: '100%',
//             height: 40,
//           }}
//         >
//           <View className="flex-row justify-between">
//             <View className="flex-row">
//               <IconButton
//                 icon={<Feather name="arrow-left" color={'#07ab86'} size={24} />}
//                 onPress={() => {}}
//                 className="my-1 mx-2"
//               />
//               <Text variant="lg">EditorX</Text>
//             </View>
//             <IconButton
//               icon={<Feather name="layers" color={'#07ab86'} size={24} />}
//               onPress={() => setStickersModalVisible(true)}
//               className="my-1 mx-2"
//             />
//             <IconButton
//               icon={<Feather name="upload" color={'#07ab86'} size={24} />}
//               onPress={captureView}
//               className="my-1 mx-2"
//             />
//           </View>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             padding: 4,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <View
//             style={{
//               borderRadius: 8,
//               borderWidth: 2,
//               overflow: 'hidden',
//             }}
//           >
//             <ViewShot
//               ref={viewShotRef}
//               style={[
//                 {
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   overflow: 'hidden',
//                 },
//                 resolutions[resolution].style,
//               ]}
//               options={{
//                 format: 'png',
//                 width: resolutions[resolution].width,
//                 height: resolutions[resolution].height,
//               }}
//             >
//               {BackGroundPicker.imageUri && (
//                 <Image
//                   source={{
//                     uri: BackGroundPicker.imageUri,
//                   }}
//                   className="h-full w-full"
//                   resizeMode="cover"
//                 />
//               )}
//               {FramePicker.imageUri && (
//                 <Image
//                   source={{
//                     uri: FramePicker.imageUri,
//                   }}
//                   className="absolute h-full w-full"
//                   resizeMode="cover"
//                 />
//               )}
//               {STATE.map((item, index) => {
//                 return (
//                   <>
//                     <DraggableResizableRotatableElement
//                       key={index}
//                       Comp={ImageComp}
//                       Height={100}
//                       Width={100}
//                       // Rotation={Math.PI / 2}
//                       // onDelete={}
//                       posX={0}
//                       posY={0}
//                       setWidget={() => {
//                         toggleWidget('image');
//                       }}
//                     />
//                   </>
//                 );
//               })}
//             </ViewShot>
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           height: 200,
//         }}
//       >
//         <View className="overflow-hidden" style={{ height: 140 }}>
//           {/* //background////////////////////////////////////////////////////// */}
//           {/* //background////////////////////////////////////////////////////// */}
//           {/* //background////////////////////////////////////////////////////// */}
//           {/* //background////////////////////////////////////////////////////// */}
//           {widget === 'background' && BACKGROUNDS.length > 0 && (
//             <HorizontalList
//               key={'background cards'}
//               // eslint-disable-next-line react/no-unstable-nested-components
//               Comp={({ item }: { item: BackgroundType }) => (
//                 <SmallCard
//                   key={item.id}
//                   onClick={() => {
//                     BackGroundPicker.setImageUri(item.image);
//                   }}
//                   url={item.image}
//                   isSelected={BackGroundPicker.imageUri === item.image}
//                 />
//               )}
//               // eslint-disable-next-line react/no-unstable-nested-components
//               Header={() => (
//                 <SmallCard
//                   onClick={() => setBackgroundModalVisible(true)}
//                   url="https://images.unsplash.com/photo-1603775020644-eb8decd79994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
//                 />
//               )}
//               snapToInterval={98}
//               data={BACKGROUNDS}
//             />
//           )}
//           {/* //frames////////////////////////////////////////////////////// */}
//           {/* //frames////////////////////////////////////////////////////// */}
//           {/* //frames////////////////////////////////////////////////////// */}
//           {/* //frames////////////////////////////////////////////////////// */}
//           {widget === 'frames' && FRAMES.length > 0 && (
//             <HorizontalList
//               key={'frame cards'}
//               // eslint-disable-next-line react/no-unstable-nested-components
//               Comp={({ item }: { item: FrameType }) => (
//                 <SmallCard
//                   key={item.id}
//                   onClick={() => {
//                     FramePicker.setImageUri(item.image);
//                   }}
//                   url={item.image}
//                   isSelected={FramePicker.imageUri === item.image}
//                 />
//               )}
//               // eslint-disable-next-line react/no-unstable-nested-components
//               Header={() => (
//                 <SmallCard
//                   onClick={() => setFrameModalVisible(true)}
//                   url="https://images.unsplash.com/photo-1603775020644-eb8decd79994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
//                 />
//               )}
//               snapToInterval={98}
//               data={FRAMES}
//             />
//           )}
//           {/* //Text//////////////////////////////////////////////////////////// */}
//           {/* //Text//////////////////////////////////////////////////////////// */}
//           {/* //Text//////////////////////////////////////////////////////////// */}
//           {/* //Text//////////////////////////////////////////////////////////// */}
//           {widget === 'text' && <TextWidget />}
//           {/* //image//////////////////////////////////////////////////////////// */}
//           {/* //image//////////////////////////////////////////////////////////// */}
//           {/* //image//////////////////////////////////////////////////////////// */}
//           {/* //image//////////////////////////////////////////////////////////// */}
//           {widget === 'image' && <ImageWidget />}
//         </View>
//         {/* modal type widgets ////////////////////////////////////////////////////////////*/}
//         <View
//           style={{
//             position: 'absolute',
//           }}
//         >
//           <StickersWidget
//             isVisible={stickersModalVisible}
//             onClose={() => setStickersModalVisible(false)}
//           />
//           <AudioWidget
//             isVisible={audioModalVisible}
//             onClose={() => setAudioModalVisible(false)}
//           />
//           <InfoWidget
//             isVisible={infoModalVisible}
//             onClose={() => setInfoModalVisible(false)}
//           />
//           <ShapesWidget
//             isVisible={shapesModalVisible}
//             onClose={() => setShapesModalVisible(false)}
//           />
//           <ElementsWidget
//             isVisible={elementsModalVisible}
//             onClose={() => setElementsModalVisible(false)}
//           />
//           <LayersWidget
//             isVisible={layersModalVisible}
//             onClose={() => setLayersModalVisible(false)}
//           />
//           <BackgroundWidget //background
//             isVisible={backgroundModalVisible}
//             onClose={() => setBackgroundModalVisible(false)}
//           />
//           <FrameWidget //background
//             isVisible={frameModalVisible}
//             onClose={() => setFrameModalVisible(false)}
//           />
//         </View>
//         {/* buttons  widgets for editing ////////////////////////////////////////////////////////////*/}
//         <View
//           style={{
//             height: 60,
//             width: '100%',
//             overflow: 'hidden',
//           }}
//         >
//           <HorizontalList
//             key={'editing icons'}
//             // eslint-disable-next-line react/no-unstable-nested-components
//             Comp={({ item }: { item: EditingFeaturesType }) => (
//               <IconButton
//                 key={item.name}
//                 icon={
//                   <Image
//                     source={{
//                       uri: 'https://cdn3.iconfinder.com/data/icons/ui-set-transparent/64/UI_icon_set_abu-02-64.png',
//                     }}
//                     className="h-8 w-8 flex-col"
//                     resizeMode="cover"
//                   />
//                 }
//                 title={item.name}
//                 onPress={() => toggleWidgetModal(item.name)}
//                 className="my-1 mx-2"
//               />
//             )}
//             snapToInterval={80}
//             data={EditingFeatures}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

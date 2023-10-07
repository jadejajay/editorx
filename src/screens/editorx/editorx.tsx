/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHistoryState } from '@uidotdev/usehooks';
import { useColorScheme } from 'nativewind';
import React, { useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';

import { BACKGROUNDS, FRAMES } from '@/api';
import {
  resolutions,
  setAudioModalVisible,
  setBackgroundModalVisible,
  setElementsModalVisible,
  setFrameModalVisible,
  setInfoModalVisible,
  setRenderModalVisible,
  setShapesModalVisible,
  setStickersModalVisible,
  useEditorX,
} from '@/core';
import { EditingFeatures } from '@/core/editing-features';
import useImagePicker from '@/core/hooks/use-image-picker';
import type { BackgroundType, EditingFeaturesType, FrameType } from '@/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import DraggableResizableRotatableElement from '@/ui/animation/drag-resize-rotate';
import { HorizontalList } from '@/ui/widgets/horizontal-list';
import { IconButton } from '@/ui/widgets/icon-button';
import { SmallCard } from '@/ui/widgets/small-card';

import {
  AudioWidget,
  BackgroundWidget,
  ElementsWidget,
  FrameWidget,
  ImageWidget,
  InfoWidget,
  RenderWidget,
  ShapesWidget,
  StickersWidget,
  TextWidget,
} from './widgets';
export const EditorX = () => {
  //`http://itekindia.com/chats/frames/format1.png`
  const { colorScheme } = useColorScheme();
  const [widget, toggleWidget] = useState<string>('background');
  const [element, setElement] = useState<any>({});
  const [renderedImage, setRenderedImage] = useState<string>('');
  const [renderedImageQlt, setRenderedImageQlt] = useState<number>(1);
  const [renderedImageExtension, setRenderedImageExtension] = useState<
    'jpg' | 'png' | 'webm'
  >('png');
  const BackGroundPicker = useImagePicker();
  const FramePicker = useImagePicker();
  const viewShotRef = useRef(null);
  const {
    stickersModalVisible,
    audioModalVisible,
    infoModalVisible,
    shapesModalVisible,
    elementsModalVisible,
    renderModalVisible,
    backgroundModalVisible,
    frameModalVisible,
    resolution,
  } = useEditorX();
  const { state, set, undo, redo, canUndo, canRedo } = useHistoryState<{
    STATE: any;
  }>({
    STATE: [],
  });
  // addObject('Object1','image',{
  //   image: 'http://itekindia.com/dashboard/ford.jpg',
  //   width: '100%',
  //   height: '100%',
  // })
  const addObject = (
    name: string,
    component: 'image' | 'text',
    properties: any
  ) => {
    const id = '_' + Math.random();
    set({
      ...state,
      STATE: state.STATE.concat({
        id: id,
        name: name,
        component: component,
        properties: properties,
      }),
    });
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      const updatedData = [...state.STATE];
      const temp = updatedData[index + 1];
      updatedData[index + 1] = updatedData[index];
      updatedData[index] = temp;
      set({ STATE: updatedData });
    }
  };

  const removeObject = (id: string) => {
    set({
      ...state,
      STATE: state.STATE.filter((item: any) => item.id !== id),
    });
  };
  const toggleWidgetModal = (item: string) => {
    if (item === 'background') {
      toggleWidget('background');
    } else if (item === 'frames') {
      toggleWidget('frames');
    } else if (item === 'info') {
      setInfoModalVisible(true);
    } else if (item === 'text') {
      toggleWidget('text');
    } else if (item === 'stickers') {
      setStickersModalVisible(true);
    } else if (item === 'audio') {
      setAudioModalVisible(true);
    } else if (item === 'shape') {
      setShapesModalVisible(true);
    } else if (item === 'image') {
      toggleWidget('image');
    } else if (item === 'elements') {
      setElementsModalVisible(true);
    }
  };

  const captureView = async () => {
    setElement({
      id: '',
      name: '',
      component: '',
      properties: {},
    });
    if (viewShotRef.current) {
      //@ts-ignore
      const result = await viewShotRef.current.capture();
      setRenderedImage(result);
      // `result` will contain the captured image in PNG format
      // console.log('captured', JSON.stringify({ result }));
    }
  };

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(width, height);
  };

  //height 200+40  StatusBar.currentHeight
  //width 4
  return (
    <View className="flex-1 justify-between">
      <View className="flex-1">
        <View
          style={{
            width: '100%',
            height: 40,
          }}
        >
          <View className="flex-row justify-between">
            <View className="flex-row">
              <IconButton
                icon={<Feather name="arrow-left" color={'#07ab86'} size={24} />}
                onPress={() => {}}
                className="my-1 mx-2"
              />

              <Text variant="lg">EditorX</Text>
              {canUndo && (
                <IconButton
                  icon={
                    <Feather name="rotate-ccw" color={'#07ab86'} size={24} />
                  }
                  onPress={undo}
                  className="my-1 mx-2"
                />
              )}
              {canRedo && (
                <IconButton
                  icon={
                    <Feather name="rotate-cw" color={'#07ab86'} size={24} />
                  }
                  onPress={redo}
                  className="my-1 mx-2"
                />
              )}
            </View>
            <IconButton
              icon={<Feather name="upload" color={'#07ab86'} size={24} />}
              onPress={() => setRenderModalVisible(true)}
              className="my-1 mx-2"
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              borderRadius: 8,
              borderWidth: 2,
              overflow: 'hidden',
            }}
          >
            <ViewShot
              ref={viewShotRef}
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                },
                resolutions[resolution].style,
              ]}
              onLayout={onLayout}
              options={{
                format: renderedImageExtension,
                fileName: `IBAIS_IMAGE_${Date.now()}`,
                quality: renderedImageQlt,
                width: resolutions[resolution].width,
                height: resolutions[resolution].height,
              }}
            >
              {BackGroundPicker.imageUri && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                  onPress={() => {
                    setElement({
                      id: '',
                      name: '',
                      component: '',
                      properties: {},
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: BackGroundPicker.imageUri,
                    }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              {FramePicker.imageUri && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                  onPress={() => {
                    setElement({
                      id: '',
                      name: '',
                      component: '',
                      properties: {},
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: FramePicker.imageUri,
                    }}
                    className="absolute h-full w-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              {state.STATE.map((item: any, index: any) => {
                return (
                  <>
                    <DraggableResizableRotatableElement
                      isFocused={element?.id === item?.id}
                      setIsFocused={(rem) => {
                        if (rem) {
                          setElement(state.STATE[index]);
                        } else {
                          setElement({
                            id: '',
                            name: '',
                            component: '',
                            properties: {},
                          });
                        }
                      }}
                      key={index}
                      item={item}
                      Height={200}
                      Width={100}
                      // Rotation={Math.PI / 2}
                      onDelete={() => {
                        removeObject(item.id);
                      }}
                      moveUp={() => moveItemUp(index)}
                      posX={0}
                      posY={0}
                      setWidget={toggleWidget}
                    />
                  </>
                );
              })}
            </ViewShot>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 200,
        }}
      >
        <View className="overflow-hidden" style={{ height: 140 }}>
          {/* //background////////////////////////////////////////////////////// */}
          {/* //background////////////////////////////////////////////////////// */}
          {/* //background////////////////////////////////////////////////////// */}
          {/* //background////////////////////////////////////////////////////// */}
          {widget === 'background' && BACKGROUNDS.length > 0 && (
            <HorizontalList
              key={'background cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: BackgroundType }) => (
                <SmallCard
                  key={item.id}
                  onClick={() => {
                    BackGroundPicker.setImageUri(item.image);
                  }}
                  url={item.image}
                  isSelected={BackGroundPicker.imageUri === item.image}
                />
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              Header={() => (
                <SmallCard
                  onClick={() => setBackgroundModalVisible(true)}
                  url="http://itekindia.com/chats/upload.png"
                />
              )}
              snapToInterval={98}
              data={BACKGROUNDS}
            />
          )}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {/* //frames////////////////////////////////////////////////////// */}
          {widget === 'frames' && FRAMES.length > 0 && (
            <HorizontalList
              key={'frame cards'}
              // eslint-disable-next-line react/no-unstable-nested-components
              Comp={({ item }: { item: FrameType }) => (
                <SmallCard
                  key={item.id}
                  onClick={() => {
                    FramePicker.setImageUri(item.image);
                  }}
                  url={item.image}
                  isSelected={FramePicker.imageUri === item.image}
                />
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              Header={() => (
                <SmallCard
                  onClick={() => setFrameModalVisible(true)}
                  url="http://itekindia.com/chats/upload.png"
                />
              )}
              snapToInterval={98}
              data={FRAMES}
            />
          )}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {/* //Text//////////////////////////////////////////////////////////// */}
          {widget === 'text' && (
            <TextWidget
              add={addObject}
              element={element}
              set={set}
              state={state}
            />
          )}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {/* //image//////////////////////////////////////////////////////////// */}
          {widget === 'image' && (
            <ImageWidget
              add={addObject}
              element={element}
              set={set}
              state={state}
            />
          )}
        </View>
        {/* modal type widgets ////////////////////////////////////////////////////////////*/}
        <View
          style={{
            position: 'absolute',
          }}
        >
          <StickersWidget
            isVisible={stickersModalVisible}
            onClose={() => setStickersModalVisible(false)}
          />
          <AudioWidget
            isVisible={audioModalVisible}
            onClose={() => setAudioModalVisible(false)}
          />
          <InfoWidget
            isVisible={infoModalVisible}
            onClose={() => setInfoModalVisible(false)}
          />
          <ShapesWidget
            isVisible={shapesModalVisible}
            onClose={() => setShapesModalVisible(false)}
          />
          <ElementsWidget
            isVisible={elementsModalVisible}
            onClose={() => setElementsModalVisible(false)}
          />
          <RenderWidget
            isVisible={renderModalVisible}
            onClose={() => setRenderModalVisible(false)}
            render={captureView}
            renderedImage={renderedImage}
            setRenderedImageExtension={setRenderedImageExtension}
            setRenderedImageQlt={setRenderedImageQlt}
          />
          <BackgroundWidget //background
            isVisible={backgroundModalVisible}
            onClose={() => setBackgroundModalVisible(false)}
          />
          <FrameWidget //background
            isVisible={frameModalVisible}
            onClose={() => setFrameModalVisible(false)}
          />
        </View>
        {/* buttons  widgets for editing ////////////////////////////////////////////////////////////*/}
        <View
          style={{
            height: 60,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <HorizontalList
            key={'editing icons'}
            // eslint-disable-next-line react/no-unstable-nested-components
            Comp={({ item }: { item: EditingFeaturesType }) => (
              <IconButton
                key={item.name}
                icon={
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={colorScheme === 'dark' ? 'white' : 'black'}
                  />
                }
                title={item.name}
                onPress={() => toggleWidgetModal(item.name)}
                className="my-1 mx-2"
              />
            )}
            snapToInterval={80}
            data={EditingFeatures}
          />
        </View>
      </View>
    </View>
  );
};

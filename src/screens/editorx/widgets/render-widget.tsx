/* eslint-disable max-lines-per-function */
import * as MediaLibrary from 'expo-media-library';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { Modal } from 'react-native';

import { handleWhatsappShare, resolutions, useEditorX } from '@/core';
import { Button, Image, Text, View } from '@/ui';
type Props8 = {
  isVisible: boolean;
  onClose: () => void;
  render: () => void;
  renderedImage: string | undefined;
  setRenderedImageExtension: any;
  setRenderedImageQlt: any;
};
export const RenderWidget = ({
  isVisible,
  onClose,
  render,
  renderedImage,
  setRenderedImageExtension,
  setRenderedImageQlt,
}: Props8) => {
  const { resolution } = useEditorX();
  const { colorScheme } = useColorScheme();
  const themecolor = colorScheme === 'dark' ? 'black' : 'white';
  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const saveToGallery = async () => {
    if (renderedImage) {
      const albumName = await MediaLibrary.getAlbumAsync('IBAIS Media');
      if (albumName) {
        const asset = await MediaLibrary.createAssetAsync(renderedImage);
        const album = await MediaLibrary.addAssetsToAlbumAsync(
          asset,
          albumName.id,
          true
        ).then((_) => {
          console.log(
            'Image saved successfully to IBAIS Media album in your gallery',
            asset.uri
          );

          handleWhatsappShare(asset.uri, 'this is my rendered image');
        });
        // const album = await MediaLibrary.createAlbumAsync(
        //   'IBAIS Media',
        //   asset,
        //   false
        // );
      } else {
        const asset = await MediaLibrary.createAssetAsync(renderedImage);
        const album = await MediaLibrary.createAlbumAsync(
          'IBAIS Media',
          asset,
          true
        );
      }
    }
  };
  const _changeExtenstion = (str: 'jpg' | 'png' | 'webm') => {
    setRenderedImageExtension(str);
  };
  const _changeQuality = (num: number) => {
    setRenderedImageQlt(num);
  };
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <View
        className="flex-1 items-center justify-center p-5"
        style={{ backgroundColor: themecolor }}
      >
        <View
          className="overflow-hidden rounded-lg border-2 border-cyan-400"
          style={resolutions[resolution].style}
        >
          {renderedImage && (
            <Image source={{ uri: renderedImage }} className="h-full w-full" />
          )}
        </View>
        <Text className="text-base">select Render Component</Text>
        <Button variant="defaults" label="change resolution" onPress={render} />
        <Button
          variant="defaults"
          label="Save to Gallery"
          onPress={saveToGallery}
        />
      </View>
    </Modal>
  );
};

// import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { getItem } from '@/core/storage';
import { Button, FocusAwareStatusBar, Text, View } from '@/ui';

import HeadphonesCarouselExample from './pager-demo';

const lastScrollIndex = 'lastScrollIndex';
/**
 * Render the Style component.
 *
 * @return {ReactNode} The rendered React component.
 */
export const Style = (): ReactNode => {
  const { navigate } = useNavigation();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [val, setVal] = useState(0);

  useEffect(() => {
    try {
      const value = getItem(lastScrollIndex);
      if (value) {
        setVal(value);
        console.log(value);
      } else {
        setVal(0);
        console.log(value);
      }
    } catch (error) {}
  }, []);

  const handleEditorx = () => {
    if (!permissionResponse?.granted) {
      const x = requestPermission();
      console.log(x);

      showMessage({
        message:
          'Give Permissions to Access Editor. Click Here to Give Permissions.',
        duration: 4000,
        onPress: () => {
          Linking.openSettings();
        },
      });
    } else {
      navigate('Editorx');
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <Text variant="md" className="text-center">
        Home Screen
      </Text>
      <Button
        label="image editor"
        variant="secondary"
        onPress={handleEditorx}
      />
      <Button
        label="telegram"
        variant="secondary"
        onPress={() => navigate('BroadCastX', { id: val })}
      />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}
      >
        <HeadphonesCarouselExample />
      </View>
    </>
  );
};

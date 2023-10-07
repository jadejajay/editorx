/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  slug: 'editorx',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#2A3D4C',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2A3D4C',
    },
    googleServicesFile: './google-services.json',
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@bacons/link-assets',
      ['./assets/fonts/courier_new_bold.ttf', './assets/fonts/Inter.ttf'],
    ],
    'expo-localization',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
          packagingOptions: {
            pickFirst: [
              'lib/x86/libc++_shared.so',
              'lib/x86_64/libjsc.so',
              'lib/arm64-v8a/libjsc.so',
              'lib/arm64-v8a/libc++_shared.so',
              'lib/x86_64/libc++_shared.so',
              'lib/armeabi-v7a/libc++_shared.so',
            ],
          },
          usesCleartextTraffic: true,
        },
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow EditorX to access your camera.',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow EditorX to access your photos.',
        savePhotosPermission: 'Allow EditorX to save photos.',
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: true,
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
    [
      'expo-av',
      {
        microphonePermission: 'Allow IBAIS MEDIA to access your microphone.',
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});

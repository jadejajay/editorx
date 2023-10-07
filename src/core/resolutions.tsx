import type { resolutionTypes } from '@/types';

export const resolutionsNames: string[] = [
  'portrait',
  'landscape',
  'square',
  'insta_portrait',
  'insta_landscape',
];
export const resolutions: resolutionTypes = {
  portrait: {
    width: 720,
    height: 1280,
    style: {
      aspectRatio: 9 / 16,
      width: '50%',
      height: '100%',
    },
  },
  landscape: {
    width: 1280,
    height: 720,
    style: {
      aspectRatio: 16 / 9,
      width: '100%',
      height: '50%',
    },
  },
  square: {
    width: 720,
    height: 720,
    style: {
      aspectRatio: 1,
      width: '100%',
    },
  },
  insta_portrait: {
    width: 1080,
    height: 1350,
    style: {
      aspectRatio: 4 / 5,
      width: '100%',
    },
  },
  insta_landscape: {
    width: 1350,
    height: 1080,
    style: {
      aspectRatio: 5 / 4,
      width: '100%',
    },
  },
};

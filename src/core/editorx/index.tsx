import { create } from 'zustand';

import type { ResolutionKey } from '@/types';

import { resolutionsNames } from '../resolutions';
import { createSelectors } from '../utils';

interface EditorXState {
  stickersModalVisible: boolean;
  audioModalVisible: boolean;
  infoModalVisible: boolean;
  shapesModalVisible: boolean;
  elementsModalVisible: boolean;
  renderModalVisible: boolean;
  backgroundModalVisible: boolean;
  frameModalVisible: boolean;
  resolution: ResolutionKey;
  setStickersModalVisible: (val: boolean) => void;
  setAudioModalVisible: (val: boolean) => void;
  setInfoModalVisible: (val: boolean) => void;
  setShapesModalVisible: (val: boolean) => void;
  setElementsModalVisible: (val: boolean) => void;
  setRenderModalVisible: (val: boolean) => void;
  setBackgroundModalVisible: (val: boolean) => void;
  setFrameModalVisible: (val: boolean) => void;
  setResolution: (val: string) => void;
}

//   const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
const _useEditorX = create<EditorXState>((set) => ({
  stickersModalVisible: false,
  audioModalVisible: false,
  infoModalVisible: false,
  shapesModalVisible: false,
  elementsModalVisible: false,
  renderModalVisible: false,
  backgroundModalVisible: false,
  frameModalVisible: false,
  resolution: 'insta_portrait',

  setStickersModalVisible: (val) => {
    set({ stickersModalVisible: val });
  },
  setAudioModalVisible: (val) => {
    set({ audioModalVisible: val });
  },
  setInfoModalVisible: (val) => {
    set({ infoModalVisible: val });
  },
  setShapesModalVisible: (val) => {
    set({ shapesModalVisible: val });
  },
  setElementsModalVisible: (val) => {
    set({ elementsModalVisible: val });
  },
  setRenderModalVisible: (val) => {
    set({ renderModalVisible: val });
  },
  setBackgroundModalVisible: (val) => {
    set({ backgroundModalVisible: val });
  },
  setFrameModalVisible: (val) => {
    set({ frameModalVisible: val });
  },

  setResolution: (val) => {
    if (resolutionsNames.includes(val)) {
      set({ resolution: val as ResolutionKey });
    } else {
      set({ resolution: 'insta_portrait' });
    }
  },
}));

export const useEditorX = createSelectors(_useEditorX);

export const setStickersModalVisible = (val: boolean) =>
  _useEditorX.getState().setStickersModalVisible(val);
export const stickersModalVisible = () =>
  _useEditorX.getState().stickersModalVisible;
export const setAudioModalVisible = (val: boolean) =>
  _useEditorX.getState().setAudioModalVisible(val);
export const audioModalVisible = () => _useEditorX.getState().audioModalVisible;
export const setInfoModalVisible = (val: boolean) =>
  _useEditorX.getState().setInfoModalVisible(val);
export const infoModalVisible = () => _useEditorX.getState().infoModalVisible;
export const setShapesModalVisible = (val: boolean) =>
  _useEditorX.getState().setShapesModalVisible(val);
export const shapesModalVisible = () =>
  _useEditorX.getState().shapesModalVisible;
export const setElementsModalVisible = (val: boolean) =>
  _useEditorX.getState().setElementsModalVisible(val);
export const elementsModalVisible = () =>
  _useEditorX.getState().elementsModalVisible;
export const setRenderModalVisible = (val: boolean) =>
  _useEditorX.getState().setRenderModalVisible(val);
export const renderModalVisible = () =>
  _useEditorX.getState().renderModalVisible;
export const setBackgroundModalVisible = (val: boolean) =>
  _useEditorX.getState().setBackgroundModalVisible(val);
export const backgroundModalVisible = () =>
  _useEditorX.getState().backgroundModalVisible;
export const setFrameModalVisible = (val: boolean) =>
  _useEditorX.getState().setFrameModalVisible(val);
export const frameModalVisible = () => _useEditorX.getState().frameModalVisible;
export const resolution = () => _useEditorX.getState().resolution;

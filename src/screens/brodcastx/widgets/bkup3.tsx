/* eslint-disable max-lines-per-function */
import firestore from '@react-native-firebase/firestore';
import type { FlashList } from '@shopify/flash-list';
import { useThrottle } from '@uidotdev/usehooks';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { showMessage } from 'react-native-flash-message';

import { groupPostsByDay, handleWhatsappShare, parseDate } from '@/core';
import { setItem } from '@/core/storage';
import type { PostType } from '@/types/broadcastx';
import type { Option } from '@/ui';
import { HEIGHT, List, Text, View, WIDTH } from '@/ui';
import { Options, useModal } from '@/ui';

import { PostCard } from './widgets';
type Props = {
  route: any;
};
const collectionPath = 'IBAIS HARDWARE GROUP';
const lastScrollIndex = 'lastScrollIndex';
const mainColor = '#151E27';
export const BroadCastX = ({ route }: Props) => {
  const modal = useModal();
  const [documentIds, setDocumentIds] = useState<PostType[]>();
  const [newData, setNewData] = useState<any>();
  const [document, setDocument] = useState<PostType>();
  const [parsedText, setParsedText] = useState('');

  useEffect(() => {
    if (documentIds) {
      const data = groupPostsByDay(documentIds);
      setNewData(data);
    }
  }, [documentIds]);
  const flashListRef = useRef<FlashList<any> | null>(null);

  const [docLn, setDocLn] = useState(0);
  const [val, setVal] = useState(0);
  const throttledValue = useThrottle(val, 600);
  const { colorScheme } = useColorScheme();
  // const flashListRef = React.useRef();
  // const flashListRef = useRef<FlashList<any> | null>(null);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setItem(lastScrollIndex, throttledValue);
  }, [throttledValue]);

  const stickyHeaderIndices = newData
    ? (newData
        .map((item: any, index: any) => {
          if (typeof item === 'number') {
            return index;
          } else {
            return null;
          }
        })
        .filter((item: null) => item !== null) as number[])
    : null;
  //sdkjfhisaugfoiugihgiksrflfgsdfgfdgdfgdfgf
  function getImageBase64(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            //@ts-ignore
            const base64Data = reader?.result.split(',')[1]; // Remove data:image/jpeg;base64,
            resolve(base64Data);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error2) => {
          reject(error2);
        });
    });
  }
  const handleOnItemPress = (item: PostType) => {
    modal.present();
    setDocument(item);
  };

  // image dsfjhgfysfyfy
  const onSelect = React.useCallback(
    (option: Option) => {
      if (option.value === 'share' && document?.url) {
        console.log('share activate');

        getImageBase64(document?.url)
          .then((base64String) => {
            handleWhatsappShare(base64String, parsedText);
          })
          // console.log(base64String);
          .catch((error2) => {
            console.error('Error fetching image:', error2);
          });
      } else if (option.value === 'copy') {
        console.log('copy');
      }

      modal.dismiss();
    },
    [document?.url, modal, parsedText]
  );
  const langs = React.useMemo(
    () => [
      { label: 'Share', value: 'share', icon: 'whatsapp' },
      { label: 'Copy', value: 'copy', icon: 'content-copy' },
    ],
    []
  );
  const scrollToItem = (item: any) => {
    // Find the index of the item with the given id in the data array
    const index = newData.findIndex((item2: any) => item2 === item);

    if (index !== -1) {
      // Scroll to the item with the specified index
      // flashListRef?.current?.prepareForLayoutAnimationRender();
      flashListRef?.current?.scrollToIndex({ index, animated: true });
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // flashListRef?.current?.scrollToEnd({ animated: true });
    }
  };
  //   function ejflkajwkjfhu() {}

  const MyComponent = React.useCallback(({ item }: { item: PostType }) => {
    return (
      <View
        key={`my-comp-${item?.id}`}
        style={{
          backgroundColor: mainColor,
        }}
      >
        <Animatable.View
          key={`animation-${item?.id}`}
          animation="bounceIn" // Apply your desired animation
          duration={1000} // Animation duration
        >
          <PostCard
            key={`postcard-${item?.id}`}
            isDark={isDark}
            collectionPath={collectionPath}
            document={item}
            setParsedText={setParsedText}
            onPress={() => handleOnItemPress(item)}
            setDoc={() => {}}
          />
        </Animatable.View>
      </View>
    );
  }, []);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(collectionPath)
      .orderBy('uploadTime', 'desc')
      .onSnapshot((querySnapshot) => {
        const ids: PostType[] = [];

        querySnapshot.forEach((doc) => {
          ids.push(doc.data() as PostType);
        });
        console.log(
          'Total users: ',
          ids?.length,
          'Total users: ',
          querySnapshot.size
        );
        showMessage({
          message: `new post available: ${ids[ids?.length]?.uploadTime}`,
          type: 'success',
          icon: 'success',
        });

        // Use setDocumentIds with a function to avoid unnecessary re-renders
        setDocLn(ids?.length);
        setDocumentIds(() => [...ids]);
      });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!documentIds) {
    return (
      <View className="flex-1 items-center">
        <Text variant="md" className="text-center">
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="absolute top-4 left-4 z-50">
        <Text variant="md" className="bg-white p-2 text-center text-black">
          {docLn}
        </Text>
      </View>
      <List
        ref={flashListRef}
        estimatedListSize={{
          width: WIDTH,
          height: HEIGHT * documentIds?.length,
        }}
        stickyHeaderIndices={
          stickyHeaderIndices?.length
            ? stickyHeaderIndices?.length > 0
              ? stickyHeaderIndices
              : undefined
            : undefined
        }
        data={newData}
        // estimatedItemSize={HEIGHT * 0.3152}
        estimatedItemSize={HEIGHT * 0.6}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        // inverted
        keyExtractor={(_item: any, index: number) => index.toString()}
        // renderItem={({ item }) => }
        renderItem={({ item, index }) => {
          if (typeof item === 'number' || typeof item === 'string') {
            const date = parseDate(item as number);
            // Rendering header
            return (
              <View
                key={index}
                className="h-10 w-full items-center justify-center"
              >
                <Text
                  className="rounded-full px-4 py-0.5 text-xs font-extrabold"
                  onPress={() => scrollToItem(item)}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    backgroundColor: '#151E2766',
                    color: '#fff',
                  }}
                >
                  {date}
                </Text>
              </View>
            );
          } else {
            // Render item
            return (
              <View key={index}>
                <MyComponent item={item} />
                {/* <PostCard data={item} isDark={isDark} /> */}
                {/* <PostCard isDark={isDark} collectionPath={collectionPath} documentId={''} /> */}
              </View>
            );
          }
        }}
        // onViewableItemsChanged={
        //   // Use a function to avoid unnecessary re-renders
        //   ({ viewableItems }) => {
        //     const changed = viewableItems.map((item) => setVal(item.item!));
        //     console.log('Changed: ', changed);
        //   }
        // }
      />
      <Options ref={modal.ref} options={langs} onSelect={onSelect} />
    </View>
  );
};

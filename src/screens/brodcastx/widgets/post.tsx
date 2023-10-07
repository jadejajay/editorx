import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCalendars } from 'expo-localization';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  extractTextUsingRegex,
  formatNumber2,
  formatTime,
  openLinkInBrowser,
  useFetchDocumentById,
} from '@/core';
import type { PostType } from '@/types/broadcastx';
import { Image, StyledText, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  collectionPath: string;
  document: PostType;
  isDark: boolean;
  setParsedText: React.Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
  setDoc: React.Dispatch<React.SetStateAction<any>>;
};
export const PostCard = ({
  isDark,
  collectionPath,
  document,
  setParsedText,
  onPress,
  setDoc,
}: Props) => {
  // const { document, loading, error } = useFetchDocumentById<PostType>(
  //   collectionPath,
  //   documentId
  // );
  // const document: PostType = {
  //   url: 'https://picsum.photos/200/300',
  //   htmlData:
  //     '<div><b>Hello, <i>world! </i><a href="http://itekindia.com" >+91 8734845201</a> <u>press this</u></b></div>',
  //   aspectRatio: 1.5,
  //   uploadTime: Date.now(),
  //   id: `${Date.now()}`,
  //   type: 'image',
  //   thumbnail: 'https://picsum.photos/200/300',
  // };
  // const loading = false;
  // const error = null;
  // React.useEffect(() => {
  //   setDoc(document);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [document]);

  // console.log(loading, error);

  if (document?.htmlData) {
    const parsedText2 = extractTextUsingRegex(document?.htmlData.trim());
    setParsedText(parsedText2);
  }

  return (
    <View className="">
      <View className="z-10">
        {document && <Header data={document} isDark={isDark} />}
      </View>
      <View className="w-full">
        {document?.url && (
          <Image
            source={{
              uri: document?.url,
            }}
            className="w-full"
            style={{ aspectRatio: document?.aspectRatio }}
          />
        )}
      </View>
      <TouchableOpacity onPress={onPress} className="p-8" activeOpacity={1}>
        {document?.htmlData && (
          <StyledText
            htmlData={document?.htmlData.trim()}
            onPress={(url, children) => {
              console.log(url, children);
              openLinkInBrowser(url);
            }}
            isDark={isDark}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

type Props2 = {
  isDark: boolean;
  data: PostType;
};
const Header = ({ data, isDark }: Props2) => {
  const cal = useCalendars();
  const views = formatNumber2(35632);
  const time = formatTime(
    data.uploadTime,
    cal[0].timeZone,
    cal[0].uses24hourClock
  );

  return (
    <View
      className="h-8 flex-row items-center justify-between"
      style={[isDark ? styles.containerMain : styles.containerMain2]}
    >
      <Text
        variant="xs"
        className="w-60 pl-16 font-bold text-sky-600"
        numberOfLines={1}
      >
        {'IBAIS HARDWARE GROUP'}
      </Text>
      <View
        className="absolute -bottom-6 ml-2 h-12 w-12 items-center justify-center overflow-hidden rounded-full"
        style={[isDark ? styles.container : styles.container2]}
      >
        <Image
          source={{
            uri: 'http://itekindia.com/dashboard/bronco.jpg',
          }}
          className="h-full w-full rounded-full"
        />
      </View>
      <View className="mr-2 flex-row items-center justify-center gap-1">
        <MaterialCommunityIcons
          name="eye"
          size={16}
          color={'rgba(100, 116, 139, 1)'} //148 163 184
        />
        <Text variant="xs" className="text-slate-500">
          {views}
        </Text>
        <Text variant="xs" className="text-slate-500">
          {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#151E27',
    backgroundColor: '#151E27',
  },
  containerMain: {
    backgroundColor: '#151E27',
  },
  containerMain2: {
    backgroundColor: '#60aae3',
  },
  container2: {
    borderWidth: 3,
    borderColor: '#60aae3',
    backgroundColor: '#60aae3',
  },
});

// const text =
// '<div><b>Hello, <i>world! </i><a href="http://itekindia.com" >+91 8734845201</a> <u>press this</u></b></div>';

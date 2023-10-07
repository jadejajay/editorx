/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-no-undef */
//@ts-nocheck
import * as React from 'react';

import { Text, View } from '@/ui';

type Props = {};
export const bkup = ({}: Props) => {
  return (
    <View className="flex-1">
      <List
        contentContainerStyle={
          isDark ? styles.containerMain : styles.containerMain2
        }
        ref={flashListRef}
        stickyHeaderIndices={
          stickyHeaderIndices.length > 0 ? stickyHeaderIndices : undefined
        }
        getItemType={(data2: any, _index: number) => {
          if (typeof data2 === 'number') {
            return 'header';
          } else {
            return 'post';
          }
        }}
        data={newData}
        // initialScrollIndex={newData.length - 1}
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
                <Post data={item} isDark={isDark} />
              </View>
            );
          }
        }}
        keyExtractor={(_item, index) => {
          return index.toString();
        }}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        ListFooterComponent={
          <View className="h-10 w-full items-center justify-center">
            <Text className="rounded-full px-4 py-0.5 text-xs font-extrabold">
              {parseDate(new Date().getTime())}
            </Text>
          </View>
        }
        estimatedItemSize={HEIGHT * 0.3152}
        inverted
        // estimatedFirstItemOffset={50}
        // scrollEventThrottle={16}
        onEndReached={loadNextPage}
        onEndReachedThreshold={2}
        onScroll={handleScroll}
        // maintainVisibleContentPosition={{
        //   minIndexForVisible: 0,
        //   // autoscrollToTopThreshold: 0,
        // }}
        // onViewableItemsChanged={
        //   ({ viewableItems }) => {
        //     if (viewableItems.length > 0) {
        //       if (viewableItems[0]?.item?.uploadTime)
        //         setCurrentDate(viewableItems[0].item.uploadTime);
        //     }
        //     // if (viewableItems.length > 0) {
        //     //   console.log('Current Post==>:', viewableItems);
        //     // }
        //   }
        //   // setCurrentState(false);
        // }
      />
    </View>
  );
};

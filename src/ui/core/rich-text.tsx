import * as himalaya from 'himalaya';
import React from 'react';

import { Text } from './text';

// eslint-disable-next-line max-params
function renderElement(
  element: any,
  index: number,
  onPress: (url: string, children: string) => void,
  isDark: boolean
) {
  if (element.type === 'element') {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const children = element.children.map((child: any, index: any) =>
      renderElement(child, index, onPress, isDark)
    );
    // console.log(
    //   '🚀 ~ file: rich-text.tsx ~ line 25 ~ renderElement ~ children',
    //   children
    // );

    switch (element.tagName) {
      case 'b':
        return (
          <Text key={index} className="my-1 font-bold">
            {children}
          </Text>
        );
      case 'i':
        return (
          <Text key={index} className="my-1 italic">
            {children}
          </Text>
        );
      case 'u':
        return (
          <Text key={index} className="my-1 underline">
            {children}
          </Text>
        );
      case 'a':
        return (
          <Text
            key={index}
            onPress={() => onPress(element?.attributes[0].value, children[0])}
            className="my-1 text-blue-600"
          >
            {children}
          </Text>
        );
      default:
        return (
          <Text key={index} className="my-1">
            {children}
          </Text>
        );
    }
  } else if (element.type === 'text') {
    return `${element.content}`;
  } else {
    return null;
  }
}

export function StyledText({
  htmlData,
  onPress,
  isDark,
}: {
  htmlData: string;
  onPress: (url: string, children: string) => void;
  isDark: boolean;
}) {
  const jsonData = himalaya.parse(htmlData) as any;
  const elements = jsonData[0].children.map((element: any, index: any) =>
    renderElement(element, index, onPress, isDark)
  );

  return <>{elements}</>;
}

// <TextWithRichFormatting
// htmlData={
//   '<div><b>Hello, <i>world! </i><a href="http://itekindia.com" >+91 8734845201</a> <u>press this</u></b></div>'
// }
// onPress={(url, children) => {
//   console.log(url, children);
// }}
// />

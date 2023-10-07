import { locale } from 'expo-localization';
import type { DateTimeFormatOptions } from 'intl';
import { Linking, ToastAndroid } from 'react-native';
import type { ShareSingleOptions, Social } from 'react-native-share';
import Share from 'react-native-share';
import type { StoreApi, UseBoundStore } from 'zustand';
const phoneRegex =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
const phoneRegex2 = /^\d{5}\s?\d{5}$/;
export function isPhone(phone: string) {
  return phoneRegex.test(phone) || phoneRegex2.test(phone);
}
export function openLinkInBrowser(url: string) {
  console.log(isPhone(url));

  if (isPhone(url)) {
    openPhone(url);
  } else {
    Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
  }
}
export function openPhone(url: string) {
  Linking.openURL(`tel:${url}`);
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function formatNumber(input: number | string) {
  // Convert the input to a number (if it's a string)
  const number = typeof input === 'string' ? parseFloat(input) : input;

  if (isNaN(number)) {
    // If the input is not a valid number, return it as is
    return input;
  }

  // Use the built-in toLocaleString method to format the number with commas
  return number.toLocaleString();
}
export function formatNumber2(input: number) {
  const number = typeof input === 'string' ? parseFloat(input) : input;

  if (isNaN(number)) {
    return input; // Return as is if not a valid number
  }

  if (number >= 1e9) {
    // Format as billion (1B, 1.2B, etc.)
    return (number / 1e9).toFixed(1) + 'B';
  } else if (number >= 1e6) {
    // Format as million (1M, 1.2M, etc.)
    return (number / 1e6).toFixed(1) + 'M';
  } else if (number >= 1e3) {
    // Format as thousand (1k, 1.2k, etc.)
    return (number / 1e3).toFixed(1) + 'k';
  } else {
    // Use the built-in toLocaleString method to format with commas
    return number.toLocaleString();
  }
}

export function formatTime(
  totalSeconds: number,
  timeZone: any = 'Asia/Calcutta',
  use24Hour: boolean | null
) {
  const date = new Date(totalSeconds); // Convert seconds to milliseconds
  const options: DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: !use24Hour!,
    timeZone, // Specify the desired time zone
  };

  // Set the desired locale
  // const locale = 'hi-IN'; // Replace with your desired locale

  // Format the time using Intl.DateTimeFormat
  const formattedTime = new Intl.DateTimeFormat(locale, options).format(date);

  return formattedTime;
}

export function extractTextUsingRegex(html: string) {
  // Remove HTML tags using a regular expression
  const textWithoutTags = html.replace(/<\/?[^>]+(>|$)/g, '');

  // Trim any leading or trailing whitespace
  const trimmedText = textWithoutTags.trim();

  return trimmedText;
}

export const handleWhatsappShare = async (
  fileUri: any,
  title: any,
  whatsAppNumber: any = '918734845201'
) => {
  //https://api.whatsapp.com/send?phone=918734845201&text=
  // openLinkInBrowser(LINK);
  try {
    //@ts-ignore
    const options: ShareSingleOptions = {
      title: 'Share via WhatsApp',
      message: title,
      // type: 'image/*',
      // url: fileUri,
      url: `data:image/png;base64,${fileUri}`,
      // url: `http://itekindia.com/dashboard/test.jpg`, // The URI of the image you want to share
      // image: fileUri,
      // filename: item.image3d,
      // url: 'http://itekindia.com/dashboard/bronco.jpg', //'data:image/png;base64,<imageInBase64>',
      type: 'image/*',
      social: Share.Social.WHATSAPP as Social,
      //@ts-ignore
      whatsAppNumber: whatsAppNumber,
      appId: 'com.whatsapp',
    };

    await Share.shareSingle(options);
  } catch (error) {
    console.error(error);
    ToastAndroid.show('Some Error', ToastAndroid.SHORT);
  }
};

// const data =
//   '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';

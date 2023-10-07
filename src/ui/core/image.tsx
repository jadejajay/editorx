// import type { ImageProps } from 'expo-image';
// import { Image as NImage } from 'expo-image';
import { styled } from 'nativewind';
import * as React from 'react';
import { Image as NImage } from 'react-native';

const SImage = styled(NImage);
export type ImgProps =
  | React.ComponentProps<typeof NImage> &
      React.ComponentProps<typeof SImage> & {
        placeholder?: string;
      };

export const Image = ({
  style,
  className,
  placeholder = `data:image/png;base64,${data}`,
  ...props
}: ImgProps) => {
  const [imageError, setImageError] = React.useState(false);
  return (
    <>
      {imageError && (
        <SImage
          source={{ uri: placeholder }} // Use your placeholder image or a base64 image
          className="absolute h-full w-full"
          resizeMode="contain"
        />
      )}
      <SImage
        className={className}
        fadeDuration={200}
        defaultSource={{
          uri: placeholder,
        }}
        onError={() => setImageError(true)}
        style={style}
        {...props}
      />
    </>
  );
};

// export const preloadImages = (sources: string[]) => {
//   NImage.prefetch(sources);
// };

const data =
  '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';

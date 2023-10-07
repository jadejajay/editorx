import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function useImagePicker() {
  const [imageUri, setImageUri] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return {
    imageUri,
    pickImage,
    setImageUri,
  };
}

//   // Load the default local image when the component mounts

//   useEffect(() => {
//     if (imageUri && imageUri !== 'data:,') {
//       // You can perform any actions with the selected image here
//       console.log('Selected image URI:', imageUri);
//     }
//   }, [imageUri]);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImageUri(result.uri);
//     }
//   };

//   return {
//     imageUri,
//     pickImage,
//   };
// }

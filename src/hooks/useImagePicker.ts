import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const useImagePicker = () => {
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);

  const pickImage = async () => {
    try {
      setLoader(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) setImage(result.assets.at(0)?.uri ?? "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  return { image, setImage, loader, pickImage };
};

export default useImagePicker;

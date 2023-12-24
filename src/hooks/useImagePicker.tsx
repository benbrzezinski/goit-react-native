import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Toast } from "toastify-react-native";
import { updateUserProfile } from "../redux/auth/actions";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase";
import MainButton from "../components/MainButton";

const useImagePicker = () => {
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const photoURL = auth.currentUser?.photoURL;
  const dispatch = useAppDispatch();

  const pickImage = async (
    type: "camera" | "mediaLibrary",
    userProfile: boolean
  ) => {
    try {
      setLoader(true);

      if (type === "camera") {
        const { granted: cameraPermissions } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { granted: mediaLibraryPermissions } =
          await MediaLibrary.requestPermissionsAsync();

        if (cameraPermissions && mediaLibraryPermissions) {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            const uri = result.assets[0].uri;
            await MediaLibrary.saveToLibraryAsync(uri);

            userProfile
              ? dispatch(updateUserProfile({ photoURL: uri }))
              : setImage(uri);
          }
        } else {
          Toast.error(
            "Access to your camera or media library is denied, please check the application settings",
            "top"
          );
        }
      }

      if (type === "mediaLibrary") {
        const { granted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (granted) {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            const uri = result.assets[0].uri;

            userProfile
              ? dispatch(updateUserProfile({ photoURL: uri }))
              : setImage(uri);
          }
        } else {
          Toast.error(
            "Access to your media library is denied, please check the application settings",
            "top"
          );
        }
      }
    } finally {
      setLoader(false);
    }
  };

  const PickImageModal = ({
    userProfile = false,
  }: {
    userProfile?: boolean;
  }) => (
    <View style={[styles.centeredView, modalVisible && { display: "flex" }]}>
      <View style={styles.modalView}>
        <MainButton
          title="Camera"
          onPress={async () => {
            setModalVisible(false);
            await pickImage("camera", userProfile);
          }}
          styleButton={{
            height: "auto",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 0,
          }}
        />
        <MainButton
          title="Media Library"
          onPress={async () => {
            setModalVisible(false);
            await pickImage("mediaLibrary", userProfile);
          }}
          styleButton={{
            height: "auto",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 0,
          }}
        />
        <Pressable
          style={{ marginTop: 5 }}
          onPress={() => setModalVisible(false)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.text}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    centeredView: {
      display: "none",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: "#00000033",
    },
    modalView: {
      justifyContent: "center",
      gap: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#e8e8e8",
      borderRadius: 8,
      padding: 20,
    },
    text: {
      fontFamily: "RobotoRegular",
      fontSize: 16,
      fontWeight: "400",
      color: "#212121",
      textAlign: "center",
    },
  });

  return {
    image,
    setImage,
    photoURL,
    loader,
    PickImageModal,
    setModalVisible,
  };
};

export default useImagePicker;

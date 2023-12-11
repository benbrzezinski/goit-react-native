import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { Fontisto, EvilIcons, Feather } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import useImagePicker from "../hooks/useImagePicker";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { image, setImage, loader, PickImageTypeModal, setModalVisible } =
    useImagePicker();
  const navigation = useNavigation();

  const canBePublished =
    image.trim() && name.trim() && location.trim() ? true : false;

  const handlePublish = () => {
    Toast.success(
      `{ Image: ${image
        .slice(0, 6)
        .trim()}, Name: ${name.trim()}, Location: ${location.trim()} }`
    );

    navigation.navigate("Posts");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.photoContainer}>
              <View style={styles.photoBox}>
                <UIActivityIndicator
                  size={42}
                  color="#ff6c00"
                  style={{ display: loader ? "flex" : "none" }}
                />
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.photo}
                    resizeMode="cover"
                    alt="Your photo of your chosen place"
                  />
                ) : null}
                <TouchableOpacity
                  style={[
                    styles.cameraCircle,
                    {
                      display: loader ? "none" : "flex",
                      backgroundColor: image ? "#ffffff4d" : "#fff",
                    },
                  ]}
                  activeOpacity={0.6}
                  onPress={() => {
                    Keyboard.dismiss();
                    image ? setImage("") : setModalVisible(true);
                  }}
                >
                  <Fontisto
                    name="camera"
                    size={20}
                    color={image ? "#fff" : "#bdbdbd"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{image ? "Edit photo" : "Photo"}</Text>
            </View>
            <View style={styles.inputsContainer}>
              <TextInput
                style={[
                  styles.input,
                  name.length !== 0
                    ? { fontFamily: "RobotoMedium", fontWeight: "500" }
                    : {},
                ]}
                placeholder="Name..."
                placeholderTextColor="#bdbdbd"
                value={name}
                onChangeText={setName}
              />
              <View style={styles.locationBox}>
                <EvilIcons
                  name="location"
                  style={styles.locationIcon}
                  size={28}
                  color="#bdbdbd"
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      paddingLeft: 30,
                    },
                  ]}
                  placeholder="Location..."
                  placeholderTextColor="#bdbdbd"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>
            <MainButton
              title="Publish"
              onPress={handlePublish}
              styleButton={{
                backgroundColor: canBePublished ? "#ff6c00" : "#f6f6f6",
                marginBottom: 0,
              }}
              styleText={{ color: canBePublished ? "#fff" : "#bdbdbd" }}
              disabled={!canBePublished}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              disabled
            >
              <Feather name="trash-2" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <PickImageTypeModal />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  wrapper: { gap: 30 },
  photoContainer: { gap: 8 },
  photoBox: {
    width: "100%",
    aspectRatio: 3 / 2,
    position: "relative",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  photo: {
    flex: 1,
    borderRadius: 8,
  },
  cameraCircle: {
    width: 60,
    height: 60,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -30 }, { translateX: -30 }],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#bdbdbd",
  },
  inputsContainer: { gap: 16 },
  input: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#e8e8e8",
    paddingVertical: 16,
    paddingHorizontal: 6,
  },
  locationBox: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{ translateY: -11 }],
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
    marginTop: "auto",
  },
  button: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
});

export default CreatePost;

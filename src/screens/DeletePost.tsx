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
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UIActivityIndicator } from "react-native-indicators";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import { DeletePostRouteParams } from "../types";
import { deletePost } from "../redux/posts/actions";
import { useAppDispatch } from "../redux/store";
import MainButton from "../components/MainButton";
import useImagePicker from "../hooks/useImagePicker";
import useLocation from "../hooks/useLocation";
import usePosts from "../hooks/usePosts";

const DeletePost = () => {
  const {
    params: { id, imageParam, nameParam, locationNameParam },
  } = useRoute() as DeletePostRouteParams;
  const [name, setName] = useState("");
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const { image, setImage, loader, PickImageModal, setModalVisible } =
    useImagePicker();
  const { locationName, setLocationName, locationLoader, getUserLocation } =
    useLocation();
  const { isPostsLoading } = usePosts();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setImage(imageParam);
    setName(nameParam);
    setLocationName(locationNameParam);
  }, []);

  const handleDelete = () => {
    dispatch(deletePost(id));
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
                      pointerEvents: "none",
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
              <Text style={styles.text}>Photo</Text>
            </View>
            <View
              style={[
                styles.inputsContainer,
                {
                  pointerEvents: "none",
                  flexDirection: isLocationFocused
                    ? "column-reverse"
                    : "column",
                },
              ]}
            >
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
                <TouchableOpacity
                  style={styles.locationBtn}
                  activeOpacity={0.8}
                  onPress={async () => {
                    Keyboard.dismiss();
                    await getUserLocation();
                  }}
                >
                  {locationLoader ? (
                    <UIActivityIndicator size={22} color="#fff" />
                  ) : (
                    <Ionicons name="location-outline" size={24} color="#fff" />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.input,
                    {
                      paddingLeft: 48,
                    },
                  ]}
                  placeholder="Location..."
                  placeholderTextColor="#bdbdbd"
                  value={locationName}
                  onChangeText={setLocationName}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setIsLocationFocused(false)}
                />
              </View>
            </View>
            <MainButton
              title={
                isPostsLoading ? (
                  <UIActivityIndicator size={24} color="#fff" />
                ) : (
                  <Feather name="trash-2" size={24} color="#fff" />
                )
              }
              onPress={handleDelete}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
              <Text style={[styles.text, { fontSize: 12 }]}>Publish</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <PickImageModal />
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
  locationBtn: {
    width: 40,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{ translateY: -18 }],
    zIndex: 1,
    backgroundColor: "#ff6c00",
    borderRadius: 8,
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

export default DeletePost;

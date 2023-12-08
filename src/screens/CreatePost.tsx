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
} from "react-native";
import { useState } from "react";
import { Fontisto, EvilIcons, Feather } from "@expo/vector-icons";
import MainButton from "../components/MainButton";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

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
                <TouchableOpacity
                  style={styles.cameraCircle}
                  activeOpacity={0.6}
                >
                  <Fontisto name="camera" size={20} color="#bdbdbd" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Photo</Text>
            </View>
            <View style={styles.inputsContainer}>
              <TextInput
                style={[
                  styles.input,
                  name.length !== 0
                    ? { fontFamily: "RobotoMedium", fontWeight: "500" }
                    : null,
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
              onPress={() => console.log("Publishing...")}
              styleButton={{
                backgroundColor: "#f6f6f6",
                marginBottom: 0,
              }}
              styleText={{ color: "#bdbdbd" }}
            />
          </View>
          {Keyboard.isVisible() ? null : (
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Feather name="trash-2" size={24} color="#bdbdbd" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  cameraCircle: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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

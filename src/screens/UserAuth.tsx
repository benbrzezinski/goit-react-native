import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AuthRouteParams } from "../types";
import SigningForm from "../components/SigningForm";
import Mountains from "../../assets/images/mountains-bg.png";

const UserAuth = () => {
  const {
    params: { type },
  } = useRoute() as AuthRouteParams;

  const keyboardVerticalOffset = Platform.select({
    ios: type === "registration" ? -100 : -160,
    android: type === "registration" ? -70 : -130,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={Mountains}
            style={styles.bgImg}
            resizeMode="cover"
            alt="Image of mountains in the background"
          />
          <View style={styles.formContainer}>
            <SigningForm type={type} />
          </View>
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
    backgroundColor: "#d7d7d7",
    justifyContent: "flex-start",
  },
  bgImg: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default UserAuth;

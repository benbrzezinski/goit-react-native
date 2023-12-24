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
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import { AuthRouteParams } from "../types";
import SigningForm from "../components/SigningForm";
import Mountains from "../../assets/images/mountains-bg.png";
import useAuth from "../hooks/useAuth";

const UserAuth = () => {
  const {
    params: { type },
  } = useRoute() as AuthRouteParams;
  const { authError } = useAuth();

  useEffect(() => {
    if (authError) Toast.error(authError, "top");
  }, [authError]);

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
    justifyContent: "flex-start",
    backgroundColor: "#d7d7d7",
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

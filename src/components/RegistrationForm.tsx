import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Button from "./Button";

const RegistrationForm = () => {
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleLoginFocus = () => {
    setLoginFocused(true);
  };

  const handleLoginBlur = () => {
    setLoginFocused(false);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.imgPicker}></View>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.formBox}>
          <TextInput
            style={[styles.input, isLoginFocused && styles.inputFocused]}
            placeholder="Login"
            placeholderTextColor="#bdbdbd"
            onFocus={handleLoginFocus}
            onBlur={handleLoginBlur}
          />
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            placeholder="Email"
            placeholderTextColor="#bdbdbd"
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
          />
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            placeholder="Password"
            placeholderTextColor="#bdbdbd"
            secureTextEntry
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
        </View>
        <Button title="Registration" onPress={() => console.log("y")} />
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "67%",
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 90,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  keyboardAvoidingView: {
    width: "100%",
    height: "100%",
  },
  imgPicker: {
    width: 120,
    height: 120,
    position: "absolute",
    top: "-24%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    zIndex: 1,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 30,
  },
  formBox: { gap: 16, marginBottom: 40 },
  input: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 8,
    padding: 16,
  },
  inputFocused: {
    borderColor: "#ff6c00",
  },
  link: {
    color: "#1b4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default RegistrationForm;

import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { MaterialIndicator } from "react-native-indicators";
import { ValidationError } from "yup";
import { EvilIcons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { registerSchema, loginSchema } from "../schemas";
import { HomeTypes } from "../types";
import MainInput from "./MainInput";
import MainButton from "./MainButton";
import useInputFocused from "../hooks/useInputFocused";
import useImagePicker from "../hooks/useImagePicker";

const SigningForm = ({ type }: HomeTypes) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const {
    isLoginFocused,
    isEmailFocused,
    isPasswordFocused,
    handleInputFocus,
    handleInputBlur,
  } = useInputFocused();
  const { image, setImage, loader, pickImage } = useImagePicker();

  const handleOnPress = async () => {
    try {
      if (type === "registration") {
        await registerSchema.validate({ login, email, password });

        Toast.success(
          `{ Login: ${login}, Email: ${email}, Password: ${password} }`
        );

        setLogin("");
        setEmail("");
        setPassword("");
      } else {
        await loginSchema.validate({ email, password });

        Toast.success(`{ Email: ${email}, Password: ${password} }`);

        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const yupError = err as ValidationError;
      Toast.error(yupError.message, "top");
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: type === "registration" ? 90 : 30,
          paddingBottom: type === "registration" ? 80 : 140,
        },
      ]}
    >
      {type === "registration" ? (
        <View style={styles.imgPickerBox}>
          <View style={styles.imgPicker}>
            {image ? (
              <>
                <View style={styles.imgPickerPhotoBox}>
                  <Image
                    source={{ uri: image }}
                    style={styles.imgPickerPhoto}
                    resizeMode="cover"
                    alt="User profile picture"
                  />
                </View>
                <Pressable
                  style={[styles.imgPickerIcon, styles.imgPickerIconBox]}
                  hitSlop={{ top: 2, bottom: 2, left: 5, right: 5 }}
                  onPress={() => setImage("")}
                >
                  <EvilIcons name="close" size={20} color="#bdbdbd" />
                </Pressable>
              </>
            ) : (
              <EvilIcons
                name="plus"
                color="#ff6c00"
                size={36}
                style={styles.imgPickerIcon}
                onPress={pickImage}
              />
            )}
            <MaterialIndicator
              size={26}
              color="#ff6c00"
              style={{ display: loader ? "flex" : "none" }}
            />
          </View>
        </View>
      ) : null}
      <Text style={styles.title}>
        {type === "registration" ? "Registration" : "Sign in"}
      </Text>
      <View style={styles.formBox}>
        {type === "registration" ? (
          <MainInput
            isInputFocused={isLoginFocused}
            placeholder="Login"
            secureTextEntry={false}
            value={login}
            onChangeText={setLogin}
            onFocus={() => handleInputFocus("login")}
            onBlur={() => handleInputBlur("login")}
          />
        ) : null}
        <MainInput
          isInputFocused={isEmailFocused}
          placeholder="Email"
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
          onFocus={() => handleInputFocus("email")}
          onBlur={() => handleInputBlur("email")}
        />
        <View style={styles.passwordBox}>
          <MainInput
            isInputFocused={isPasswordFocused}
            placeholder="Password"
            secureTextEntry={!isPasswordShowed}
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleInputFocus("password")}
            onBlur={() => handleInputBlur("password")}
            paddingRight={67}
          />
          <Text
            style={styles.passwordShow}
            onPress={() => setIsPasswordShowed(p => !p)}
          >
            {isPasswordShowed ? "Hide" : "Show"}
          </Text>
        </View>
      </View>
      <MainButton
        title={type === "registration" ? "Registration" : "Sign in"}
        onPress={handleOnPress}
      />
      <Text style={styles.link}>
        {type === "registration"
          ? "Already have an account? Sign in"
          : "Don't have an account? Register now"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  imgPickerBox: {
    alignItems: "center",
    position: "absolute",
    top: -60,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  imgPicker: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  imgPickerPhotoBox: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  imgPickerPhoto: {
    flex: 1,
  },
  imgPickerIconBox: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 9999,
    right: -13,
  },
  imgPickerIcon: {
    position: "absolute",
    bottom: 12,
    right: -18,
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
  passwordBox: {
    position: "relative",
  },
  passwordShow: {
    position: "absolute",
    top: "50%",
    right: 16,
    transform: [{ translateY: -10 }],
    color: "#1b4371",
    fontSize: 17,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
  },
  link: {
    color: "#1b4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default SigningForm;
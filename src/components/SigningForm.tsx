import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { UIActivityIndicator } from "react-native-indicators";
import { ValidationError } from "yup";
import { EvilIcons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { registerDB, loginDB } from "../redux/auth/actions";
import { cancelAuthError } from "../redux/auth/slice";
import { registerSchema, loginSchema } from "../schemas";
import { SigningFormTypes } from "../types";
import { useAppDispatch } from "../redux/store";
import MainInput from "./MainInput";
import MainButton from "./MainButton";
import useInputFocused from "../hooks/useInputFocused";
import useImagePicker from "../hooks/useImagePicker";
import useAuth from "../hooks/useAuth";

const SigningForm = ({ type }: SigningFormTypes) => {
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
  const { image, setImage, loader, PickImageModal, setModalVisible } =
    useImagePicker();
  const { isAuthLoading } = useAuth();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSigningForm = async () => {
    try {
      if (type === "registration") {
        await registerSchema.validate({ login, email, password });
        dispatch(
          registerDB({ email, password, displayName: login, photoURL: image })
        );
      } else {
        await loginSchema.validate({ email, password });
        dispatch(loginDB({ email, password }));
      }
    } catch (err) {
      const yupError = err as ValidationError;
      Toast.error(yupError.message, "top");
    }
  };

  const handleSwitchForm = () => {
    if (type === "registration") {
      dispatch(cancelAuthError());
      navigation.navigate("Login");
    } else {
      dispatch(cancelAuthError());
      navigation.navigate("Registration");
    }
  };

  return (
    <>
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
                  <Image
                    source={{ uri: image }}
                    style={styles.imgPickerPhoto}
                    resizeMode="cover"
                    alt="User profile picture"
                  />
                  <Pressable
                    style={[styles.imgPickerIcon, styles.imgPickerIconBox]}
                    onPress={() => setImage("")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <EvilIcons name="close" size={20} color="#bdbdbd" />
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={styles.imgPickerIcon}
                  onPress={() => setModalVisible(true)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <EvilIcons name="plus" color="#ff6c00" size={36} />
                </Pressable>
              )}
              <UIActivityIndicator
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
            inputMode="email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleInputFocus("email")}
            onBlur={() => handleInputBlur("email")}
          />
          <View>
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
            <Pressable
              style={styles.passwordShowBox}
              onPress={() => setIsPasswordShowed(p => !p)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.passwordShow}>
                {isPasswordShowed ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>
        <MainButton
          title={
            isAuthLoading ? (
              <UIActivityIndicator size={24} color="#fff" />
            ) : type === "registration" ? (
              "Registration"
            ) : (
              "Sign in"
            )
          }
          onPress={handleSigningForm}
        />
        <Pressable
          onPress={handleSwitchForm}
          hitSlop={{ top: 6, bottom: 20, left: 5, right: 5 }}
        >
          <Text style={styles.link}>
            {type === "registration"
              ? "Already have an account? Sign in"
              : "Don't have an account? Register now"}
          </Text>
        </Pressable>
      </View>
      <PickImageModal />
    </>
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
  imgPickerPhoto: {
    flex: 1,
    borderRadius: 16,
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
  passwordShowBox: {
    height: 24,
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    right: 16,
    transform: [{ translateY: -12 }],
  },
  passwordShow: {
    color: "#1b4371",
    fontSize: 17,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
  },
  link: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#1b4371",
    textAlign: "center",
  },
});

export default SigningForm;

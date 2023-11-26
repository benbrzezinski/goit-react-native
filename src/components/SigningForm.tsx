import { StyleSheet, View, Text, Alert } from "react-native";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import MainInput from "./MainInput";
import MainButton from "./MainButton";
import useInputFocused from "../hooks/useInputFocused";

const SigningForm = () => {
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

  const handleOnPress = () => {
    Alert.alert(
      `1. Login: ${login} 
       2. Email: ${email} 
       3. Password: ${password}`
    );

    setLogin("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imgPickerBox}>
        <View style={styles.imgPicker}>
          <EvilIcons name="plus" size={36} style={styles.imgPickerIcon} />
        </View>
      </View>
      <Text style={styles.title}>Registration</Text>
      <View style={styles.formBox}>
        <MainInput
          isInputFocused={isLoginFocused}
          placeholder="Login"
          secureTextEntry={false}
          value={login}
          onChangeText={setLogin}
          onFocus={() => handleInputFocus("login")}
          onBlur={() => handleInputBlur("login")}
        />
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
      <MainButton title="Registration" onPress={handleOnPress} />
      <Text style={styles.link}>Already have an account? Sign in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 90,
    paddingHorizontal: 16,
    paddingBottom: 80,
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
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  imgPickerIcon: {
    color: "#ff6c00",
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

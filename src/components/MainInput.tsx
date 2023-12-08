import { StyleSheet, TextInput } from "react-native";
import { MainInputTypes } from "../types";

const MainInput = ({
  isInputFocused,
  placeholder,
  secureTextEntry,
  inputMode = "text",
  value,
  onChangeText,
  onFocus,
  onBlur,
  paddingRight = 16,
}: MainInputTypes) => {
  return (
    <TextInput
      style={[
        styles.input,
        isInputFocused && styles.inputFocused,
        { paddingRight },
      ]}
      placeholder={placeholder}
      placeholderTextColor="#bdbdbd"
      secureTextEntry={secureTextEntry}
      inputMode={inputMode}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    borderColor: "#ff6c00",
  },
});

export default MainInput;

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MainButtonTypes } from "../types";

const MainButton = ({
  title,
  onPress,
  styleButton = {},
  styleText = {},
  disabled = false,
}: MainButtonTypes) => {
  return (
    <TouchableOpacity
      style={[styles.button, styleButton]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
  },
});

export default MainButton;

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
      {typeof title === "string" ? (
        <Text style={[styles.text, styleText]}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    paddingHorizontal: 16,
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

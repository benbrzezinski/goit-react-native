import { Text, StyleSheet, Pressable } from "react-native";
import { ButtonTypes } from "../types";

const Button = ({ title, onPress }: ButtonTypes) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#ff6c00",
    marginBottom: 16,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
  },
});

export default Button;

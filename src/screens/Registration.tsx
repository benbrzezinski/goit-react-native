import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RegistrationForm from "../components/RegistrationForm";
import Mountains from "../../assets/images/mountains-bg.png";

const Registration = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={Mountains}
          resizeMode="cover"
          style={styles.bgImg}
        />
        <View style={styles.formContainer}>
          <RegistrationForm />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d7d7",
  },
  bgImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default Registration;

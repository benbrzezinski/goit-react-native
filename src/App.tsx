import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ToastManager from "toastify-react-native";
import UserAuth from "./screens/UserAuth";
import Home from "./screens/Home";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <UserAuth type="registration" />
      {/* <UserAuth type="login" /> */}
      {/* <Home /> */}
      <ToastManager
        width={320}
        height={70}
        duration={5000}
        textStyle={{
          fontFamily: "RobotoRegular",
          fontSize: 12,
          color: "#212121",
        }}
      />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;

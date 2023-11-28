import { useFonts } from "expo-font";
import ToastManager from "toastify-react-native";
import Home from "./screens/Home";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <Home type="registration" />
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
    </>
  );
};

export default App;

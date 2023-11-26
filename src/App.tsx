import { useFonts } from "expo-font";
import Signing from "./screens/Signing";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Signing />;
};

export default App;

import { useFonts } from "expo-font";
import Registration from "./screens/Registration";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Registration />;
};

export default App;

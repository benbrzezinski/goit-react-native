import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ToastManager from "toastify-react-native";
import UserAuth from "./screens/UserAuth";
import Home from "./screens/Home";
import CreatePost from "./screens/CreatePost";
import Map from "./screens/Map";
import HeaderLeft from "./components/HeaderLeft";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const MainStack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              shadowOpacity: 0,
              backgroundColor: "#fff",
              borderBottomWidth: 0.5,
              borderStyle: "solid",
              borderBottomColor: "#0000004d",
            },
            headerTitleStyle: {
              fontFamily: "RobotoMedium",
              fontWeight: "500",
              fontSize: 17,
              color: "#212121",
            },
            headerTitleAlign: "center",
          }}
        >
          <MainStack.Screen
            name="Login"
            component={UserAuth}
            initialParams={{ type: "login" }}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Registration"
            component={UserAuth}
            initialParams={{ type: "registration" }}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ title: "Create post", headerLeft: HeaderLeft }}
          />
          <MainStack.Screen
            name="Map"
            component={Map}
            options={{ title: "Map", headerLeft: HeaderLeft }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
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

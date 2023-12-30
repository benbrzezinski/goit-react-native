import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { setIsLoggedIn } from "../redux/auth/slice";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase";
import UserAuth from "../screens/UserAuth";
import Home from "../screens/Home";
import CreatePost from "../screens/CreatePost";
import DeletePost from "../screens/DeletePost";
import Map from "../screens/Map";
import Comments from "../screens/Comments";
import HeaderLeft from "./HeaderLeft";
import useAuth from "../hooks/useAuth";

const AppNav = () => {
  const MainStack = createStackNavigator();
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user ? dispatch(setIsLoggedIn(true)) : dispatch(setIsLoggedIn(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          gestureEnabled: false,
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
        {isLoggedIn ? (
          <>
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
              name="DeletePost"
              component={DeletePost}
              options={{ title: "Delete post", headerLeft: HeaderLeft }}
            />
            <MainStack.Screen
              name="Map"
              component={Map}
              options={{ headerLeft: HeaderLeft }}
            />
            <MainStack.Screen
              name="Comments"
              component={Comments}
              options={{ headerLeft: HeaderLeft }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;

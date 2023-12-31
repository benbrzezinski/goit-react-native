import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useRoute,
  useNavigation,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Toast } from "toastify-react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { HandleNavTypes, HandleNavTarget } from "../types";
import Posts from "./Posts";
import Profile from "./Profile";
import HeaderRight from "../components/HeaderRight";
import usePosts from "../hooks/usePosts";

const Home = () => {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const currentRoute = getFocusedRouteNameFromRoute(route);
  const navigation = useNavigation();
  const { postsError } = usePosts();

  useEffect(() => {
    if (postsError) Toast.error(postsError, "top");
  }, [postsError]);

  const handleNav = (target: HandleNavTarget) => {
    const navType: HandleNavTypes = {
      posts: () => navigation.navigate("Posts"),
      createPost: () => navigation.navigate("CreatePost"),
      profile: () => navigation.navigate("Profile"),
    };

    return navType[target]();
  };

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      tabBar={() => (
        <View style={styles.footer}>
          <Pressable
            onPress={() => handleNav("posts")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="grid" size={24} color="#212121cc" />
          </Pressable>
          <TouchableOpacity
            style={[
              styles.btn,
              { pointerEvents: currentRoute === "Profile" ? "none" : "auto" },
            ]}
            activeOpacity={0.8}
            onPress={() => handleNav("createPost")}
          >
            {currentRoute === "Profile" ? (
              <Feather name="user" size={24} color="#fff" />
            ) : (
              <AntDesign name="plus" size={20} color="#fff" />
            )}
          </TouchableOpacity>
          <Pressable
            onPress={() =>
              handleNav(currentRoute === "Profile" ? "createPost" : "profile")
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {currentRoute === "Profile" ? (
              <AntDesign name="plus" size={20} color="#212121cc" />
            ) : (
              <Feather name="user" size={24} color="#212121cc" />
            )}
          </Pressable>
        </View>
      )}
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
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderRight style={{ paddingRight: 16 }} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderStyle: "solid",
    borderTopColor: "#0000004d",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  btn: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderRadius: 20,
  },
});

export default Home;

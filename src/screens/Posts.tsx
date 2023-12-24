import { StyleSheet, View, Text, Image } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { auth } from "../firebase";
import PostsList from "../components/PostsList";
import useAuth from "../hooks/useAuth";

const Posts = () => {
  const {
    user: { displayName, email },
    isUserUpdateLoading,
  } = useAuth();
  const authName = auth.currentUser?.displayName;
  const authEmail = auth.currentUser?.email;
  const photoURL = auth.currentUser?.photoURL;

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <View style={styles.userImgBox}>
          {photoURL && !isUserUpdateLoading ? (
            <Image
              source={{ uri: photoURL }}
              style={styles.userImg}
              resizeMode="cover"
              alt="User profile picture"
            />
          ) : null}
          <UIActivityIndicator
            size={22}
            color="#ff6c00"
            style={{
              display: isUserUpdateLoading ? "flex" : "none",
            }}
          />
        </View>
        <View>
          <Text style={styles.userLogin}>{displayName ?? authName ?? ""}</Text>
          <Text style={styles.userEmail}>{email ?? authEmail ?? ""}</Text>
        </View>
      </View>
      <PostsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  userImgBox: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  userImg: {
    flex: 1,
    borderRadius: 16,
  },
  userLogin: {
    fontFamily: "RobotoBold",
    fontWeight: "700",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 11,
    color: "#212121cc",
  },
});

export default Posts;

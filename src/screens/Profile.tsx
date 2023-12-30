import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import ProfileContent from "../components/ProfileContent";
import UserPostsList from "../components/UserPostsList";
import Mountains from "../../assets/images/mountains-bg.png";

const Profile = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Mountains}
        style={styles.bgImg}
        resizeMode="cover"
        alt="Image of mountains in the background"
      />
      <View style={styles.profileContainer}>
        <ProfileContent />
      </View>
      <UserPostsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#eee",
  },
  bgImg: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Profile;

import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import User from "../../assets/images/user.jpg";

const Posts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <View style={styles.userBox}>
          <Image
            source={User}
            style={styles.userImg}
            resizeMode="cover"
            alt="User profile picture"
          />
          <View>
            <Text style={styles.userLogin}>Klaudia Nowak</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: { flex: 1, paddingVertical: 30, paddingHorizontal: 16 },
  userBox: { flexDirection: "row", alignItems: "center", gap: 10 },
  userImg: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
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

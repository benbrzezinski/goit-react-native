import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import User from "../../assets/images/user.jpg";

const Posts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="log-out"
          size={24}
          color="#bdbdbd"
          style={styles.hidden}
        />
        <Text style={styles.title}>Posts</Text>
        <Feather name="log-out" size={24} color="#bdbdbd" />
      </View>
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
      <View style={styles.footer}>
        <Ionicons name="grid-outline" size={24} color="#212121cc" />
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <AntDesign name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        <Feather name="user" size={24} color="#212121cc" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#0000004d",
    padding: 16,
  },
  hidden: { pointerEvents: "none", opacity: 0 },
  title: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 17,
    color: "#212121",
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#0000004d",
    padding: 16,
  },
  button: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderRadius: 20,
  },
});

export default Posts;

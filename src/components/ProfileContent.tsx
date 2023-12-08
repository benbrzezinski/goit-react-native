import { StyleSheet, Text, View, Image } from "react-native";
import HeaderRight from "./HeaderRight";
import User from "../../assets/images/user.jpg";

const ProfileContent = () => {
  return (
    <View style={styles.wrapper}>
      <HeaderRight style={styles.logOutIcon} />
      <View style={styles.imgPickerBox}>
        <View style={styles.imgPicker}>
          <Image
            source={User}
            style={styles.userImg}
            resizeMode="cover"
            alt="User profile picture"
          />
        </View>
      </View>
      <Text style={styles.userLogin}>Klaudia Nowak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 90,
    paddingHorizontal: 16,
  },
  logOutIcon: { position: "absolute", top: 20, right: 16, zIndex: 10 },
  imgPickerBox: {
    position: "absolute",
    top: -60,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
  },
  imgPicker: {
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  userLogin: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 30,
  },
});

export default ProfileContent;

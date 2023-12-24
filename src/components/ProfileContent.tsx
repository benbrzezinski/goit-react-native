import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { EvilIcons } from "@expo/vector-icons";
import { updateUserProfile } from "../redux/auth/actions";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase";
import HeaderRight from "./HeaderRight";
import useImagePicker from "../hooks/useImagePicker";
import useAuth from "../hooks/useAuth";

const ProfileContent = () => {
  const {
    user: { displayName },
    isUserUpdateLoading,
  } = useAuth();
  const { photoURL, loader, PickImageModal, setModalVisible } =
    useImagePicker();
  const dispatch = useAppDispatch();
  const authName = auth.currentUser?.displayName;

  return (
    <>
      <View style={styles.wrapper}>
        <HeaderRight style={styles.logOutIcon} />
        <View style={styles.imgPickerBox}>
          <View style={styles.imgPicker}>
            {photoURL && !isUserUpdateLoading ? (
              <>
                <Image
                  source={{ uri: photoURL }}
                  style={styles.imgPickerPhoto}
                  resizeMode="cover"
                  alt="User profile picture"
                />
                <Pressable
                  style={[styles.imgPickerIcon, styles.imgPickerIconBox]}
                  onPress={() => dispatch(updateUserProfile({ photoURL: "" }))}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <EvilIcons name="close" size={20} color="#bdbdbd" />
                </Pressable>
              </>
            ) : (
              <Pressable
                style={styles.imgPickerIcon}
                onPress={() => setModalVisible(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <EvilIcons name="plus" color="#ff6c00" size={36} />
              </Pressable>
            )}
            <UIActivityIndicator
              size={26}
              color="#ff6c00"
              style={{
                display: loader || isUserUpdateLoading ? "flex" : "none",
              }}
            />
          </View>
        </View>
        <Text style={styles.userLogin}>{displayName ?? authName ?? ""}</Text>
      </View>
      <PickImageModal userProfile />
    </>
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
    alignItems: "center",
    position: "absolute",
    top: -60,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  imgPicker: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  imgPickerPhoto: {
    flex: 1,
    borderRadius: 16,
  },
  imgPickerIconBox: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 9999,
    right: -13,
  },
  imgPickerIcon: {
    position: "absolute",
    bottom: 12,
    right: -18,
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

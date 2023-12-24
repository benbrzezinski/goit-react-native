import { useEffect } from "react";
import { Pressable } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { Feather } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { logoutDB } from "../redux/auth/actions";
import { HeaderRightTypes } from "../types";
import { useAppDispatch } from "../redux/store";
import useAuth from "../hooks/useAuth";

const HeaderRight = ({ style }: HeaderRightTypes) => {
  const { isLogoutLoading, authError } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authError) Toast.error(authError, "top");
  }, [authError]);

  return (
    <Pressable
      style={style}
      onPress={() => dispatch(logoutDB())}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {isLogoutLoading ? (
        <UIActivityIndicator size={24} color="#bdbdbd" />
      ) : (
        <Feather name="log-out" size={24} color="#bdbdbd" />
      )}
    </Pressable>
  );
};

export default HeaderRight;

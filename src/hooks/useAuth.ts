import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectIsLogoutLoading,
  selectIsUpdateLoading,
  selectError,
} from "../redux/auth/selectors";

const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthLoading = useSelector(selectIsLoading);
  const isLogoutLoading = useSelector(selectIsLogoutLoading);
  const isUserUpdateLoading = useSelector(selectIsUpdateLoading);
  const authError = useSelector(selectError);

  return {
    user,
    isLoggedIn,
    isAuthLoading,
    isLogoutLoading,
    isUserUpdateLoading,
    authError,
  };
};

export default useAuth;

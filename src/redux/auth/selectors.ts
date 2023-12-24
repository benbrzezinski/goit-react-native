import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsLogoutLoading = (state: RootState) =>
  state.auth.isLogoutLoading;
export const selectIsUpdateLoading = (state: RootState) =>
  state.auth.isUpdateLoading;
export const selectError = (state: RootState) => state.auth.error;

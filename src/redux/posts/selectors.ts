import { RootState } from "../store";

export const selectPosts = (state: RootState) => state.posts.all;
export const selectUserPosts = (state: RootState) => state.posts.user;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
export const selectIsUpdateLoading = (state: RootState) =>
  state.posts.isUpdateLoading;
export const selectError = (state: RootState) => state.posts.error;

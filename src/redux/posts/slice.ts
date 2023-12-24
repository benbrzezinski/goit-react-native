import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { PostsState } from "../../types";
import {
  getPosts,
  getUserPosts,
  addPost,
  deletePost,
  updatePost,
} from "./actions";

const initialState: PostsState = {
  all: [],
  user: [],
  isLoading: false,
  isUpdateLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.all.unshift(action.payload);
          state.user.unshift(action.payload);
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const indexAll = state.all.findIndex(({ id }) => id === action.payload);
        const indexUser = state.user.findIndex(
          ({ id }) => id === action.payload
        );

        state.all.splice(indexAll, 1);
        state.user.splice(indexUser, 1);
      })
      .addCase(updatePost.pending, state => {
        state.isUpdateLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload) {
          const { type, postID } = payload;
          const post = state.all.find(({ id }) => id === postID);
          const userPost = state.user.find(({ id }) => id === postID);

          if (type === "liked") {
            post && post.usersLikes.push(payload.userID);
            userPost && userPost.usersLikes.push(payload.userID);
          }

          if (type === "disliked") {
            if (post) {
              const indexAll = post.usersLikes.findIndex(
                u => u === payload.userID
              );
              post.usersLikes.splice(indexAll, 1);
            }

            if (userPost) {
              const indexUser = userPost.usersLikes.findIndex(
                u => u === payload.userID
              );
              userPost.usersLikes.splice(indexUser, 1);
            }
          }

          if (type === "comment") {
            post && post.comments.push(payload.comment);
            userPost && userPost.comments.push(payload.comment);
          }
        }
      })
      .addMatcher(
        action =>
          !action.type.startsWith("posts/update") &&
          action.type.startsWith("posts") &&
          action.type.endsWith("/pending"),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith("posts") && action.type.endsWith("/fulfilled"),
        state => {
          state.isLoading = false;
          state.isUpdateLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith("posts") && action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isUpdateLoading = false;
          state.error = action.payload;
        }
      );
  },
});

const postsReducer = postsSlice.reducer;
export default postsReducer;

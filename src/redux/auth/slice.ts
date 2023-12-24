import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types";
import { registerDB, loginDB, logoutDB, updateUserProfile } from "./actions";

const initialState: AuthState = {
  user: { displayName: null, email: null },
  isLoggedIn: false,
  isLoading: false,
  isLogoutLoading: false,
  isUpdateLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    cancelAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerDB.fulfilled, (state, action) => {
        const { displayName, email } = action.payload;
        state.user = { displayName, email };
        state.isLoggedIn = true;
      })
      .addCase(loginDB.fulfilled, (state, action) => {
        const { displayName, email } = action.payload;
        state.user = { displayName, email };
        state.isLoggedIn = true;
      })
      .addCase(logoutDB.pending, state => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutDB.fulfilled, state => {
        state.user = { displayName: null, email: null };
        state.isLoggedIn = false;
      })
      .addCase(updateUserProfile.pending, state => {
        state.isUpdateLoading = true;
      })
      .addMatcher(
        action =>
          action.type.startsWith("auth/registerDB/pending") ||
          action.type.startsWith("auth/loginDB/pending"),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith("auth") && action.type.endsWith("/fulfilled"),
        state => {
          state.isLoading = false;
          state.isLogoutLoading = false;
          state.isUpdateLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith("auth") && action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isLogoutLoading = false;
          state.isUpdateLoading = false;
          state.error = action.payload;
        }
      );
  },
});

const authReducer = authSlice.reducer;
export const { setIsLoggedIn, cancelAuthError } = authSlice.actions;
export default authReducer;

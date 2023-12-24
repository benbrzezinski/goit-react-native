import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { RegistrationData, LoginData, UpdateProfileData } from "../../types";

export const registerDB = createAsyncThunk(
  "auth/registerDB",
  async (
    { email, password, displayName, photoURL }: RegistrationData,
    thunkAPI
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        await updateProfile(user, { displayName, photoURL });
      }

      return user;
    } catch {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

export const loginDB = createAsyncThunk(
  "auth/loginDB",
  async ({ email, password }: LoginData, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

export const logoutDB = createAsyncThunk(
  "auth/logoutDB",
  async (_, thunkAPI) => {
    try {
      await auth.signOut();
    } catch {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (data: UpdateProfileData, thunkAPI) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, data);
      } catch {
        return thunkAPI.rejectWithValue("Profile update failed");
      }
    }
  }
);

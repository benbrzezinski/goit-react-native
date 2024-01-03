import { Timestamp } from "firebase/firestore";
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  InputModeOptions,
} from "react-native";

export interface SigningFormTypes {
  type: "registration" | "login";
}

export interface HeaderRightTypes {
  style: StyleProp<ViewStyle>;
}

export interface ListEmptyTypes {
  text: string;
}

export interface MainButtonTypes {
  title: string | React.JSX.Element;
  onPress: () => void;
  styleButton?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export interface MainInputTypes {
  isInputFocused: boolean;
  placeholder: string;
  secureTextEntry: boolean;
  inputMode?: InputModeOptions;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  paddingRight?: number;
}

export interface HandleNavTypes {
  [key: string]: () => void;
}

export type HandleNavTarget = "posts" | "createPost" | "profile";

export type InputFocusedTypes = "login" | "email" | "password" | "comment";

export interface AuthRouteParams {
  params: {
    type: "registration" | "login";
  };
}

interface UserMapRouteParams {
  params: {
    type: "user";
  };
}

interface PhotoMapRouteParams {
  params: {
    type: "photo";
    address: string;
  };
}

export type MapRouteParams = UserMapRouteParams | PhotoMapRouteParams;

export interface CommentsRouteParams {
  params: {
    id: string;
  };
}

export interface DeletePostRouteParams {
  params: {
    id: string;
    imageParam: string;
    nameParam: string;
    locationNameParam: string;
  };
}

export type LocationCoords = {
  latitude: number;
  longitude: number;
} | null;

export interface AuthState {
  user: {
    displayName: string | null;
    email: string | null;
  };
  isLoggedIn: boolean;
  isLoading: boolean;
  isLogoutLoading: boolean;
  isUpdateLoading: boolean;
  error: string | null;
}

export interface RegistrationData {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  displayName?: string;
  photoURL?: string;
}

export interface Comment {
  id: string;
  username: string;
  profileImg: string;
  text: string;
  createdBy: string;
  createdAt: Timestamp;
}

export interface Post {
  id: string;
  image: string;
  name: string;
  locationName: string;
  usersLikes: string[];
  comments: Comment[];
  createdBy: string;
  createdAt: Timestamp;
}

export interface PostsState {
  all: Post[];
  user: Post[];
  isLoading: boolean;
  isUpdateLoading: boolean;
  error: string | null;
}

export type GetUserPostsData = string;

export interface AddPostData {
  image: string;
  name: string;
  locationName: string;
}

export interface UpdatePostData {
  userID?: string;
  postID: string;
  usersLikes?: string[];
  comment?: Comment;
}

export interface LikedUpdatePostPayloadAction {
  userID: string;
  postID: string;
  type: "liked";
}

export interface DislikedUpdatePostPayloadAction {
  userID: string;
  postID: string;
  type: "disliked";
}

export interface CommentUpdatePostPayloadAction {
  postID: string;
  type: "comment";
  comment: Comment;
}

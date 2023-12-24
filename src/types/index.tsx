import { InputModeOptions } from "react-native";

export interface SigningFormTypes {
  type: "registration" | "login";
}

export interface HeaderRightTypes {
  style: object;
}

export interface MainButtonTypes {
  title: string | React.JSX.Element;
  onPress: () => void;
  styleButton?: object;
  styleText?: object;
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

interface Comment {
  profileImg: string;
  text: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  image: string;
  name: string;
  locationName: string;
  usersLikes: string[];
  comments: Comment[];
  createdBy: string;
  createdAt: Date;
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
  userID: string | undefined;
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

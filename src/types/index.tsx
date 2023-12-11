import { InputModeOptions } from "react-native";

export interface SigningFormTypes {
  type: "registration" | "login";
}

export interface HeaderRightTypes {
  style: object;
}

export interface MainButtonTypes {
  title: string;
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

export interface RouteParams {
  params: {
    type: "registration" | "login";
  };
}

export interface UserAuthTypes {
  type: string;
}

export interface MainButtonTypes {
  title: string;
  onPress: () => void;
}

export interface MainInputTypes {
  isInputFocused: boolean;
  placeholder: string;
  secureTextEntry: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  paddingRight?: number;
}

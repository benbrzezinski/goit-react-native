import { useState } from "react";
import { InputFocusedTypes } from "../types";

const useInputFocused = () => {
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isCommentFocused, setCommentFocused] = useState(false);

  const handleInputFocus = (type: InputFocusedTypes) => {
    switch (type) {
      case "login":
        setLoginFocused(true);
        break;
      case "email":
        setEmailFocused(true);
        break;
      case "password":
        setPasswordFocused(true);
        break;
      case "comment":
        setCommentFocused(true);
        break;
      default:
        return;
    }
  };

  const handleInputBlur = (type: InputFocusedTypes) => {
    switch (type) {
      case "login":
        setLoginFocused(false);
        break;
      case "email":
        setEmailFocused(false);
        break;
      case "password":
        setPasswordFocused(false);
        break;
      case "comment":
        setCommentFocused(false);
        break;
      default:
        return;
    }
  };

  return {
    isLoginFocused,
    isEmailFocused,
    isPasswordFocused,
    isCommentFocused,
    handleInputFocus,
    handleInputBlur,
  };
};

export default useInputFocused;

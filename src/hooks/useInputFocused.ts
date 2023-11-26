import { useState } from "react";

const useInputFocused = () => {
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleInputFocus = (type: string) => {
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
      default:
        return;
    }
  };

  const handleInputBlur = (type: string) => {
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
      default:
        return;
    }
  };

  return {
    isLoginFocused,
    isEmailFocused,
    isPasswordFocused,
    handleInputFocus,
    handleInputBlur,
  };
};

export default useInputFocused;

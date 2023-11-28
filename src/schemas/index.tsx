import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  login: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Login must contain only letters")
    .trim()
    .required("Login is required"),
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    )
    .trim()
    .required("Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    )
    .trim()
    .required("Password is required"),
});

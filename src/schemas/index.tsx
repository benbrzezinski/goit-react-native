import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    )
    .trim()
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  login: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Login must contain only letters and spaces")
    .trim()
    .required("Login is required"),
});

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    )
    .trim()
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
});

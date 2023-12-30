import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    ),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
  login: Yup.string()
    .trim()
    .required("Login is required")
    .matches(/^[a-zA-Z\s]+$/, "Login must contain only letters"),
  image: Yup.string().trim().required("Set your profile photo"),
});

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    ),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
});

import yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup.string().min(4).required("Password is required").min(4),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const updateUserSchema = yup.object({
  name: yup.string(),
  profileImage: yup.string(),
});

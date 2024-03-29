import * as Yup from "yup"
import YupPassword from 'yup-password';
YupPassword(Yup);

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username : Yup.string().required(),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string()
    .required()
    .matches(/[0-9]/,'phone must be a number')
    .matches(/0[0-9]/,'phone must start with 0')
    .min(10,'phone must contain 10 or more digits'),
  password: Yup.string()
    .required("Password is required")
    .min(6, 'Password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  confirm: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
});

export const loginValidationSchema = Yup.object({
  text: Yup.string().required("Input is required"),
  password: Yup.string()
  .required("Password is required")
});

export const forgotValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, 'Password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  confirm: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
});

export const changePasswordSchema = Yup.object({
  oldpassword: Yup.string()
    .required("Password is required"),
  password: Yup.string()
    .required("Password is required")
    .notOneOf([Yup.ref('oldpassword')],"New and old Password can't be the same")
    .min(6, 'Password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  confirm: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('password'), null], 'Must match "new Password" field value'),
});

export const publishBlogSchema = Yup.object({
    title: Yup.string()
    .required("Title is required"),
    country: Yup.string()
    .required("Country is required"),
    date: Yup.string()
    .required("Date is required"),
    picture: Yup.string()
    .required("Picture is required"),
    category: Yup.string(),
    content: Yup.string()
    .required("Content is required"),
    keywords: Yup.string()
    .required("Keywords is required")
});

export const editProfileSchema = Yup.object().shape({
  username : Yup.string(),
  email: Yup.string().email(),
  phone: Yup.string()
    .matches(/[0-9]/,'Phone must be a number')
    .matches(/0[0-9]/,'Phone must start with 0')
    .min(10,'Phone must contain 10 or more digits'),
});
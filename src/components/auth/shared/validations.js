// src/components/auth/validationSchemas.js
import * as yup from "yup";

// common rules
const firstName = yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name cannot exceed 30 characters");

const lastName = yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name cannot exceed 30 characters");

const userName = yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters");


const email = yup
    .string()
    .email("Invalid email format")
    .required("Email is required");

const currentPassword = yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters");


const password = yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters");

const confirmPassword = yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match");

// schemas
export const validations = {
    login: yup.object({ userName, password }),
    register: yup.object({ firstName, lastName, userName, email, password, confirmPassword }),
    forgetPassword: yup.object({ email }),
    resetPassword: yup.object({ password, confirmPassword }),
    userInformation:yup.object({ firstName, lastName, userName, email }),
    changePassword:yup.object({currentPassword,password,confirmPassword})
};

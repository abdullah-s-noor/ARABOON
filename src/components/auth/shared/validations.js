// src/components/auth/validationSchemas.js
import * as yup from "yup";

export const getValidations = (t) => {
  // common rules
  const firstName = yup
    .string()
    .required(t("authValidation.first_name_required"))
    .min(2, t("authValidation.first_name_min"))
    .max(30, t("authValidation.first_name_max"));

  const lastName = yup
    .string()
    .required(t("authValidation.last_name_required"))
    .min(2, t("authValidation.last_name_min"))
    .max(30, t("authValidation.last_name_max"));

  const userName = yup
    .string()
    .required(t("authValidation.username_required"))
    .min(3, t("authValidation.username_min"))
    .max(30, t("authValidation.username_max"));

  const email = yup
    .string()
    .email(t("authValidation.email_invalid"))
    .required(t("authValidation.email_required"));

  const currentPassword = yup
    .string()
    .required(t("authValidation.current_password_required"))
    .min(8, t("authValidation.current_password_min"));

  const password = yup
    .string()
    .required(t("authValidation.password_required"))
    .min(8, t("authValidation.password_min"));

  const confirmPassword = yup
    .string()
    .required(t("authValidation.confirm_password_required"))
    .oneOf([yup.ref("password"), null], t("authValidation.confirm_password_match"));

  // schemas
  return {
    login: yup.object({ userName, password }),
    register: yup.object({ firstName, lastName, userName, email, password, confirmPassword }),
    forgetPassword: yup.object({ email }),
    resetPassword: yup.object({ password, confirmPassword }),
    userInformation: yup.object({ firstName, lastName, userName, email }),
    changePassword: yup.object({ currentPassword, password, confirmPassword }),
  };
};

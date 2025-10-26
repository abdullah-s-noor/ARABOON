// src/components/auth/validationSchemas.js
import * as yup from "yup";

export const getValidations = (t) => {
  // common rules
  const categoryNameEn =yup
  .string()
  .required("category name in English req")
  const categoryNameAr =yup
  .string()
  .required("category name in Arabic req")
  return {
    addCategoryFields: yup.object({ categoryNameEn, categoryNameAr }),
    
  };
};

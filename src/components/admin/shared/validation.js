// src/components/auth/validationSchemas.js
import * as yup from "yup";
import { addMangaFields } from "./formFields";

export const getValidations = (t) => {
  // common rules
  const categoryNameEn =yup
  .string()
  .required("category name in English req")
  const categoryNameAr =yup
  .string()
  .required("category name in Arabic req")

  const mangaNameEn = yup
    .string()
    .required("Manga Name (English) is required");
  const authorEn = yup
    .string()
    .required("Author (English) is required");
  const descriptionEn = yup
    .string()
    .min(2, "Description (English) too short")
    .required("Description (English) is required");

  const mangaNameAr = yup
    .string()
    .required("اسم المانجا مطلوب");
  const authorAr = yup
    .string()
    .required("اسم المؤلف مطلوب");
  const descriptionAr = yup
    .string()
    .min(2, "الوصف قصير جدا")
    .required("الوصف مطلوب");

  return {
    addCategoryFields: yup.object({ categoryNameEn, categoryNameAr }),
    addMangaFields:yup.object({mangaNameEn,authorEn,descriptionEn,mangaNameAr,authorAr,descriptionAr})
  };
};

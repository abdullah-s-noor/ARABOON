// src/components/auth/validationSchemas.js
import * as yup from "yup";
export const getValidations = (t) => {
  // common rules
  const categoryNameEn = yup
    .string()
    .required("category name in English req")
  const categoryNameAr = yup
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

  const chapterTitleEn = yup
    .string()
    .min(2, "Chapter Title (English) too short")
    .required("Chapter Title (English) is required");

  const chapterTitleAr = yup
    .string()
    .min(2, "Chapter Title (English) too short")
    .required("Chapter Title (English) is required");

  const chapterNo = yup
  .number()
  .typeError("Chapter number must be a number")
  .integer("Chapter number must be integer")
  .min(1, "Minimum chapter is 1")
  .required("Chapter number is required");



  return {
    addCategoryFields: yup.object({ categoryNameEn, categoryNameAr }),
    addMangaFields: yup.object({ mangaNameEn, authorEn, descriptionEn, mangaNameAr, authorAr, descriptionAr }),
    addChapterFields: yup.object({ chapterTitleEn, chapterTitleAr, chapterNo })
  };
};

// src/components/auth/validationSchemas.js
import * as yup from "yup";

export const getValidations = (t) => {

  // common rules (all translated)
  const categoryNameEn = yup
    .string()
    .required(t("validationDashboard.categoryNameEnReq"));

  const categoryNameAr = yup
    .string()
    .required(t("validationDashboard.categoryNameArReq"));

  const mangaNameEn = yup
    .string()
    .required(t("validationDashboard.mangaNameEnReq"));

  const authorEn = yup
    .string()
    .required(t("validationDashboard.authorEnReq"));

  const descriptionEn = yup
    .string()
    .min(2, t("validationDashboard.descriptionEnShort"))
    .required(t("validationDashboard.descriptionEnReq"));

  const mangaNameAr = yup
    .string()
    .required(t("validationDashboard.mangaNameArReq"));

  const authorAr = yup
    .string()
    .required(t("validationDashboard.authorArReq"));

  const descriptionAr = yup
    .string()
    .min(2, t("validationDashboard.descriptionArShort"))
    .required(t("validationDashboard.descriptionArReq"));

  const chapterTitleEn = yup
    .string()
    .min(2, t("validationDashboard.chapterTitleEnShort"))
    .required(t("validationDashboard.chapterTitleEnReq"));

  const chapterTitleAr = yup
    .string()
    .min(2, t("validationDashboard.chapterTitleArShort"))
    .required(t("validationDashboard.chapterTitleArReq"));

  const chapterNo = yup
    .number()
    .typeError(t("validationDashboard.chapterNoType"))
    .integer(t("validationDashboard.chapterNoInt"))
    .min(1, t("validationDashboard.chapterNoMin"))
    .required(t("validationDashboard.chapterNoReq"));

  const noteEn = yup
    .string()
    .required(t("validationDashboard.noteEnReq"));

  const noteAr = yup
    .string()
    .required(t("validationDashboard.noteArReq"));

  const link = yup
    .string()
    .url(t("validationDashboard.linkValid"))
    .required(t("validationDashboard.linkReq"));

  return {
    addCategoryFields: yup.object({ categoryNameEn, categoryNameAr }),

    addMangaFields: yup.object({
      mangaNameEn,
      authorEn,
      descriptionEn,
      mangaNameAr,
      authorAr,
      descriptionAr
    }),

    addChapterFields: yup.object({
      chapterTitleEn,
      chapterTitleAr,
      chapterNo
    }),

    addBannerFields: yup.object({
      link,
      noteEn,
      noteAr
    }),
  };
};

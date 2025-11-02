export const fields = {
    categoryNameEn: { type: "text", title: "category Name (English)", id: "categoryNameEn", name: "categoryNameEn", language: "en" },
    categoryNameAr: { type: "text", title: "category Name (Arabic)", id: "categoryNameAr", name: "categoryNameAr", language: "ar" },

    mangaNameEn: { type: "text", label: "Manga Name (English)", id: "mangaNameEn", name: "mangaNameEn", language: "en", },
    mangaNameAr: { type: "text", label: "Manga Name (Arabic)", id: "mangaNameAr", name: "mangaNameAr", language: "ar", },
    authorEn: { type: "text", label: "Author (English)", id: "authorEn", name: "authorEn", language: "en", },
    authorAr: { type: "text", label: "Author (Arabic)", id: "authorAr", name: "authorAr", language: "ar", },
    descriptionEn: { type: "textarea", label: "Description (English)", id: "descriptionEn", name: "descriptionEn", language: "en", },
    descriptionAr: { type: "textarea", label: "Description (Arabic)", id: "descriptionAr", name: "descriptionAr", language: "ar", },
};
export const addCategoryFields = [
    fields.categoryNameEn,
    fields.categoryNameAr
]

export const addMangaFields = {
    en: [
        fields.mangaNameEn,
        fields.authorEn,
        fields.descriptionEn,
    ],
    ar: [
        fields.mangaNameAr,
        fields.authorAr,
        fields.descriptionAr,
    ]
}

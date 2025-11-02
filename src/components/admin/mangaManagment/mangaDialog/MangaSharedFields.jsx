import { Box, useTheme} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomSelectField from './CustomSelectField';
import CustomSelectFieldCat from './CustomSelectFieldCat';

const STATUS_MAP = {
    en: ["Ongoing", "Completed", "One Shot"],
    ar: ["مستمر", "مكتمل", "ون شوت"],
};
const TYPE_MAP = {
    en: ["Manga", "Manhwa", "Manhua"],
    ar: ["مانجا", "مانهوا", "مانهوا صينية"],
};
function MangaSharedFields({ formik, allCategories }) {
    const theme = useTheme()
    const isError = Boolean(formik.errors.statusEn && formik.touched.statusEn);
    const { i18n } = useTranslation()
    const { t } = useTranslation()
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

            <CustomSelectField
                value={formik.values.statusEn}
                name="statusEn"
                label={t("statusTitle")}
                options={STATUS_MAP.en.map((en, i) => ({
                    value: en,
                    label: en + " // " + STATUS_MAP.ar[i]
                }))}
                onChange={(e) => {
                    const enVal = e.target.value;
                    const idx = STATUS_MAP.en.indexOf(enVal);
                    formik.setFieldValue("statusEn", enVal);
                    formik.setFieldValue("statusAr", STATUS_MAP.ar[idx]);
                }}
                error={formik.errors.statusEn}
                touched={formik.touched.statusEn}
            />

            <CustomSelectField
                value={formik.values.typeEn}
                name="typeEn"
                label={t("typeTitle")}
                options={TYPE_MAP.en.map((en, i) => ({
                    value: en,
                    label: en + " // " + TYPE_MAP.ar[i]
                }))}
                onChange={(e) => {
                    const enVal = e.target.value;
                    const idx = TYPE_MAP.en.indexOf(enVal);
                    formik.setFieldValue("typeEn", enVal);
                    formik.setFieldValue("typeAr", TYPE_MAP.ar[idx]);
                }}
                error={formik.errors.typeEn}
                touched={formik.touched.typeEn}
            />
            <CustomSelectFieldCat
                label={t("categoriesTitle")}
                name="categories"
                value={formik.values.categories}
                options={allCategories}
                error={formik.errors.categories}
                touched={formik.touched.categories}
                onChange={formik.handleChange}
                i18n={i18n}
            />
        </Box>
    )
}

export default MangaSharedFields

import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Input from "../../common/Input";
import { useTranslation } from "react-i18next";

const RenderFields = ({ formik, fields, isEdit = true }) => {
    const {i18n}=useTranslation()
    // Correct equality check!
    const EnFields = fields.filter(f => f.language === "en");
    const ArFields = fields.filter(f => f.language === "ar");
    return (
        <>
            <Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {i18n.language==="en"?"English":"الانجليزية"}
                </Typography>
                {EnFields.map(field => (
                    <Box key={field.id} mb={2}>
                        <Input
                            type={field.type}
                            title={field.title}
                            id={field.id}
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                            disabled={!isEdit}
                        />
                    </Box>
                ))}
            </Box>
            <Divider/>
            <Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {i18n.language==="en"?"Arabic":"العربية"}
                </Typography>
                {ArFields.map(field => (
                    <Box key={field.id} mb={2}>
                        <Input
                            type={field.type}
                            title={field.title}
                            id={field.id}
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                            disabled={!isEdit}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default RenderFields;

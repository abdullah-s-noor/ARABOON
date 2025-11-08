import React from "react";
import { Box, Divider, TextField } from "@mui/material";
import { addChapterFields } from "../shared/formFields";
import Input from "../../common/Input";
const FIELD_CONFIGS = addChapterFields

function MangaTabsFields({ formik, language }) {
    const fields = FIELD_CONFIGS[language] || [];
    return (
        <Box sx={{mt: {xs:1,sm:2}, display: "flex", flexDirection: "column", gap: {xs:1,sm:2}, position: "absolute", width: "100%" }}>
            {fields.map(field => (
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
                    disabled={false}
                />

            ))}
        </Box>
    );
}

export default MangaTabsFields;

import React from "react";
import { Box } from "@mui/material";
import Input from "../../common/Input";

const RenderFields = ({ formik, fields }) => {
    // نفلتر الحقول الخاصة بـ first & last
    const firstLast = fields.filter(
        (f) => f.id === "firstName" || f.id === "lastName"
    );
    const others = fields.filter(
        (f) => f.id !== "firstName" && f.id !== "lastName"
    );

    return (
        <>
            {/* first & last جنب بعض */}
            {firstLast.length === 2 && (
                <Box display="flex" gap={1} mb={2}>
                    {firstLast.map((field) => (
                        <Box flex={1} key={field.id}>
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
                            />
                        </Box>
                    ))}
                </Box>
            )}

            {/* باقي الحقول */}
            {others.map((field) => (
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
                    />
                </Box>
            ))}
        </>
    );
};

export default RenderFields;

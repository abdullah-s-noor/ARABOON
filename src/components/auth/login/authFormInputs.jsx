import React from 'react';
import { Box } from '@mui/material';
import Input from '../../common/Input'; // عدّل المسار حسب مشروعك

export const renderInput = (formik, inputs) => (
    <>
        {inputs(formik)
            .filter(input => input.id !== 'firstName' && input.id !== 'lastName')
            .map(input => (
                <Box mb={2} key={input.id}>
                    <Input
                        type={input.type}
                        title={input.title}
                        id={input.id}
                        name={input.name}
                        value={input.value}
                        onChange={formik.handleChange}
                        errors={formik.errors}
                        onBlur={formik.handleBlur}
                        touched={formik.touched}
                    />
                </Box>
            ))}
    </>
);

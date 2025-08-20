import React from 'react';
import { Box } from '@mui/material';
import Input from '../../common/Input'; // عدّل المسار حسب مشروعك

export const renderInput1 = (formik) => (
    <Box display="flex" gap={2} mb={2}>
        <Box flex={1}>
            <Input
                type="text"
                title="First Name"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                errors={formik.errors}
                onBlur={formik.handleBlur}
                touched={formik.touched}
            />
        </Box>
        <Box flex={1}>
            <Input
                type="text"
                title="Last Name"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                errors={formik.errors}
                onBlur={formik.handleBlur}
                touched={formik.touched}
            />
        </Box>
    </Box>
);

export const renderInput2 = (formik, inputs) => (
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

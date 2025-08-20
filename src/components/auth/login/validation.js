import * as yup from 'yup';

const validationSchema = yup.object({
    userName: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters'),

    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),

});

export default validationSchema;

import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { useFormik } from 'formik';
import validationSchema from './validation';
import inputs from './inputs';
import { styles } from '../register/styles';
import { renderInput } from './authFormInputs.jsx'; // عدّل المسار حسب مشروعك
function Register({ setMode }) {
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        userName: '',
        password: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setServerError(null);
        try {
            const { data } = await api.post('/Authentication/SignIn', values);
            toast.success('Signin successful!.');
        } catch (error) {
            const Errors = error.response?.data?.Errors;
            if (Errors) {
                const userNameError = Errors?.UserName?.[0];
                const emailError = Errors?.Email?.[0];
                const passwordError = Errors?.Password?.[0];
                setServerError(userNameError || emailError || passwordError || 'Something went wrong.');
                console.log('Errors from server:', Errors);
            } else if (error.response?.data?.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError('Something went wrong. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <>
            <Box sx={style.header}>
                <Typography sx={style.title}>Welcome Back</Typography>
                <Typography sx={style.subtitle}>Create your account and unlock your potential</Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                {serverError && (
                    <Alert severity="error" sx={style.errorAlert}>
                        {serverError}
                    </Alert>
                )}
                {renderInput(formik, inputs)}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
                    {/* Bottom text */}
                    <Typography sx={{ textAlign: 'end' }}>
                        <Button onClick={() => { setMode('register') }} sx={style.signInForgetButton}>Forgot password?</Button>
                    </Typography>
                    {/* Submit Button */}
                    <Button type="submit" sx={style.submitButton}>Sign in</Button>
                    {/* Bottom text */}
                    <Typography sx={style.bottomText}>Don't have an account?{" "}
                        <Button onClick={() => { setMode('register') }} sx={style.signInForgetButton}>Sign up</Button>
                    </Typography>
                </Box>
            </Box>

        </>
    )
}

export default Register

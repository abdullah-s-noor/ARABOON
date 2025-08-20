import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useFormik } from 'formik';
import { validations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { forgetPasswordFields } from './shared/formFields';
import { ArrowBackIosNew } from '@mui/icons-material';
function SendForgetPasswordEmail({ setMode }) {
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        email: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setServerError(null);
        try {
            const { data } = await api.post('/Authentication/SendForgetPasswordEmail', values);
            toast.success('Verification code sent successfully.');
        } catch (error) {
            console.log(error)
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
        validationSchema: validations.forgetPassword
    });
    return (
        <>
            <Box sx={style.header}>
                <Typography sx={style.title}>Find Your Account</Typography>
                <Typography sx={style.subtitle}>Enter your email and we’ll send you a verification code to confirm your identity.</Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                {serverError && (
                    <Alert severity="error" sx={style.errorAlert}>
                        {serverError}
                    </Alert>
                )}
                <RenderFields formik={formik} fields={forgetPasswordFields} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
                    {/* Submit Button */}
                    <Button type="submit" sx={style.submitButton}>Send request</Button>
                    {/* Bottom text */}
                    <Typography sx={{ ...style.bottomText, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowBackIosNew sx={{ fontSize: '14px', ...style.signInForgetButton }} />
                        <Button onClick={() => { setMode('login') }} sx={style.signInForgetButton}>Return to sign in</Button>
                    </Typography>
                </Box>
            </Box>

        </>
    )
}

export default SendForgetPasswordEmail

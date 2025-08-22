import { Alert, Box, Button, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useFormik } from 'formik';
import { validations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { resetPasswordFields } from './shared/formFields';
import { ArrowBackIosNew, Password } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import OTP from './OTP';
function CodeConfirmation({ setMode, emailForReset }) {
    const [tokenForReset, setTokenForReset] = useState(null)
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setServerError(null);
        try {
            const payload = {
                email: emailForReset,
                token: tokenForReset,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            console.log(payload)
            const { data } = await api.post('/Authentication/ResetPassword', payload);
            toast.success('Reset password successfully.');
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

    const handleReset = async () => {
        try {
            setTokenForReset(null)
            const { data } = await api.post('/Authentication/SendForgetPasswordEmail', { email: emailForReset });
            toast.success("A new code has been sent to your email.")
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validations.resetPassword
    });
    return (
        <>
            <Box sx={style.header}>
                <Typography sx={style.title}>Reset Your Password</Typography>
                {!tokenForReset? <Typography sx={style.subtitle}>We've sent a 6-digit code to your email. <br />Please enter it to continue.</Typography>
                :<Typography sx={style.subtitle}>Your code has been verified, please set a new password.</Typography>
                }
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                {serverError && (
                    <Alert severity="error" sx={style.errorAlert}>
                        {serverError}
                    </Alert>
                )}
                <OTP setTokenForReset={setTokenForReset} formik={formik} emailForReset={emailForReset} />
                {tokenForReset && <RenderFields formik={formik} fields={resetPasswordFields} />}
                {/* Submit Button */}
                {tokenForReset && <Button type="submit" sx={style.submitButton}>Send request</Button>}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px", mt: tokenForReset && 2 }}>
                {/* Bottom text */}
                {!tokenForReset && <Typography variant="body2" sx={{ textAlign: 'center', color: "#94a3b8", }}
                    onClick={() => { handleReset() }}>
                    Don’t have a code?{' '}
                    <Typography component="span" sx={style.resend}>Resend</Typography>
                </Typography>}

                <MuiLink variant="body2" component={RouterLink} to="" sx={style.signInBack} onClick={() => { setMode('login') }} >
                    <ArrowBackIosNew fontSize="small" sx={{ fontSize: '10px' }} />
                    Return to sign in
                </MuiLink>
            </Box>

        </>
    )
}

export default CodeConfirmation

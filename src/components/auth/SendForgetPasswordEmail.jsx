import { Alert, Box, Button, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useFormik } from 'formik';
import { getValidations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { forgetPasswordFields } from './shared/formFields';
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function SendForgetPasswordEmail({ setMode, setEmailForReset }) {
    const { t, i18n } = useTranslation()
    const validations = getValidations(t)
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        email: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setServerError(null);
        try {
            const { data } = await api.post('/Authentication/SendForgetPasswordEmail', values,
                { headers: { "Rate-Limiting-Key": values.email } }
            );
            console.log("sendEmail", data)
            setEmailForReset(values.email)
            toast.success(data.message);
            setMode('sendcode')
        } catch (error) {
            console.log(error)
            const errors = error.response?.data?.errors;
            if (errors) {
                const userNameError = errors?.UserName?.[0];
                const emailError = errors?.Email?.[0];
                const passwordError = errors?.Password?.[0];
                setServerError(userNameError || emailError || passwordError || 'Something went wrong.');
                console.log('errors from server:', errors);
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
                <Typography sx={style.title}>{t('forgot.title')}</Typography>
                <Typography sx={style.subtitle}>{t('forgot.subtitle')}</Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                {serverError && (
                    <Alert severity="error" sx={style.errorAlert}>
                        {serverError}
                    </Alert>
                )}
                <RenderFields formik={formik} fields={forgetPasswordFields} />
                {/* Submit Button */}
                <Button disabled={
                    !formik.isValid ||
                    formik.isSubmitting ||
                    !formik.dirty
                }
                    variant="contained" type="submit" sx={style.submitButton}>
                    {t('forgot.send_request')}
                </Button>
            </Box>

            <MuiLink variant="body2" component={RouterLink} to="" sx={{ ...style.signInBack, mt: 1 }} onClick={() => { setMode('login') }}>
                {i18n.language === 'en' ? <ArrowBackIos fontSize="small" sx={{ fontSize: '10px' }} /> : <ArrowForwardIos fontSize="small" sx={{ fontSize: '10px' }} />}
                {t('forgot.return_to_signin')}
            </MuiLink>

        </>
    )
}

export default SendForgetPasswordEmail

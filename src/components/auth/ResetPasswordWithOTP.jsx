import { Alert, Box, Button, Typography, useTheme, Link as MuiLink } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useFormik } from 'formik';
import { getValidations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { resetPasswordFields } from './shared/formFields';
import { ArrowBackIos,ArrowForwardIos } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import OTP from './OTP';
import { useTranslation } from 'react-i18next';
import { handleAuthSubmit } from '../../services/authHelperReq';
function ResetPasswordWithOTP({ setMode, emailForReset }) {
    const { t, i18n } = useTranslation()
    const validations=getValidations(t)
    const [tokenForReset, setTokenForReset] = useState(null)
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        password: '',
        confirmPassword: '',
    };
    const [resendLoading,setResendLoading]=useState(false)

    const onSubmit = async (values, { setSubmitting }) => {
        const payload = {
            email: emailForReset,
            token: tokenForReset,
            password: values.password,
            confirmPassword: values.confirmPassword
        };
        await handleAuthSubmit({
            endpoint: '/Authentication/ResetPassword',
            payload,
            setServerError,
            setSubmitting,
            successMessage: 'Reset password successfully.',
            setMode,nextMode:'login',login:null,t:t
        });
    };

    const handleReset = async () => {
        try {
            setResendLoading(true)
            setTokenForReset(null)
            const { data } = await api.post('/Authentication/SendForgetPasswordEmail', { email: emailForReset });
            toast.success(t("new_code_sent"));
        } catch (error) {
            console.log(error)
        } finally {
            setResendLoading(false)
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
                <Typography sx={style.title}>{t('reset.title')}</Typography>
                {!tokenForReset ? <Typography sx={style.subtitle}>{t('reset.subtitle1')}</Typography>
                    : <Typography sx={style.subtitle}>{t('reset.subtitle1')}</Typography>
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
                {tokenForReset && <Button type="submit" sx={style.submitButton}>{t('forgot.send_request')}</Button>}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px", mt: tokenForReset && 2 }}>
                {/* Bottom text */}
                {!tokenForReset && <Typography variant="body2" sx={{ textAlign: 'center', color: "#94a3b8", }}
                    onClick={() => { !resendLoading&&handleReset() }}>
                    {t('reset.no_code')}{' '}
                    <Typography component="span" sx={style.resend}>{t('reset.resend')} </Typography>
                </Typography>}

                <MuiLink variant="body2" component={RouterLink} to="" sx={{ ...style.signInBack, mt: 1 }} onClick={() => { setMode('login') }}>
                    {i18n.language === 'en' ? <ArrowBackIos fontSize="small" sx={{ fontSize: '10px' }} /> : <ArrowForwardIos fontSize="small" sx={{ fontSize: '10px' }} />}
                    {t('forgot.return_to_signin')}
                </MuiLink>
            </Box>

        </>
    )
}

export default ResetPasswordWithOTP

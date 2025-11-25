import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { getValidations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { loginFields } from './shared/formFields';
import { useTranslation } from 'react-i18next';
import { handleAuthSubmit } from '../../services/authHelperReq';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
function Login({ setMode }) {
    const { userToken, login, userData,contextLoading,setContextLoading,nextPath,setNextPath } = useContext(UserContext)
    const { t } = useTranslation()
    const navigate=useNavigate()
    const validations=getValidations(t)
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const initialValues = {
        userName: '',
        password: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
        await handleAuthSubmit({
            endpoint: '/Authentication/SignIn',
            payload: values,
            setServerError,
            setSubmitting,
            successMessage: 'Signin successful!.',
            setMode, nextMode: 'close', login:login,t:t,
            setNextPath,nextPath,navigate,setContextLoading
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validations.login
    });
    return (
        <>
            <Box sx={style.header}>
                <Typography sx={style.title}>{t("signin.welcome_back")}</Typography>
                <Typography sx={style.subtitle}>{t('signin.login_subtitle')}</Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                {serverError && (
                    <Alert severity="error" sx={style.errorAlert}>
                        {serverError}
                    </Alert>
                )}

                <RenderFields formik={formik} fields={loginFields} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
                    {/* Bottom text */}
                    <Typography sx={{ textAlign: 'end' }}>
                        <Button onClick={() => { setMode('forgetpassword') }} sx={style.signInForgetButton}>{t('signin.forgot_password')}</Button>
                    </Typography>
                    {/* Submit Button */}
                    <Button type="submit" sx={style.submitButton}>{t('signin.sign_in')}</Button>

                </Box>
            </Box>

            {/* Bottom text */}
            <Typography sx={style.bottomText}>{t('signin.dont_have_account')}{" "}
                <Button onClick={() => { setMode('register') }} sx={style.signInForgetButton}>{t('signin.sign_up')}</Button>
            </Typography>

        </>
    )
}

export default Login

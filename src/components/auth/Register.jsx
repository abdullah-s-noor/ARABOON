import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getValidations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { registerFields } from './shared/formFields';
import { useTranslation } from 'react-i18next';
import { handleAuthSubmit } from '../../services/authHelperReq';
function Register({ setMode }) {
  const { t } = useTranslation()
  const validations = getValidations(t)
  const theme = useTheme()
  const [serverError, setServerError] = useState(null);
  const style = styles(theme)
  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    await handleAuthSubmit({
      endpoint: '/Authentication/RegistrationUser',
      payload: values,
      setServerError,
      setSubmitting,
      successMessage: 'Registration successful! Please log in.',
      setMode, nextMode: 'login', login: null
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validations.register,
  });
  return (
    <>
      <Box sx={style.header}>
        <Typography sx={style.title}>{t('register.title')}</Typography>
        <Typography sx={style.subtitle}>{t('register.subtitle')}</Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
        {serverError && (
          <Alert severity="error" sx={style.errorAlert}>
            {serverError}
          </Alert>
        )}
        <RenderFields formik={formik} fields={registerFields} />
        {/* Submit Button */}
        <Button sx={style.submitButton}
          disabled={
            !formik.isValid ||
            formik.isSubmitting ||
            !formik.dirty
          }
          variant="contained" type="submit">
          {t('register.create_account')}</Button>
      </Box>

      {/* Bottom text */}
      <Typography sx={style.bottomText}>{t('register.already_have_account')}{""}
        <Button sx={style.signInForgetButton} onClick={() => { setMode('login') }}>{t('register.sign_in')}</Button>
      </Typography>

    </>
  )
}

export default Register

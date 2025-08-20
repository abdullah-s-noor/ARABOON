import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useFormik } from 'formik';
import { validations } from './shared/validations';
import { styles } from './styles';
import RenderFields from './shared/RenderFields';
import { registerFields } from './shared/formFields';
function Register({ setMode }) {
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
    setServerError(null);
    try {
      const { data } = await api.post('/Authentication/RegistrationUser', values);
      toast.success('Registration successful! Please log in.');
      setMode('login')
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
    validationSchema: validations.register,
  });
  return (
    <>
      <Box sx={style.header}>
        <Typography sx={style.title}>Join the ARABOON</Typography>
        <Typography sx={style.subtitle}>Create your account and unlock your potential</Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
        {serverError && (
          <Alert severity="error" sx={style.errorAlert}>
            {serverError}
          </Alert>
        )}
        <RenderFields formik={formik} fields={registerFields} />
        {/* Submit Button */}
        <Button type="submit" sx={style.submitButton}>Create Account</Button>
      </Box>

      {/* Bottom text */}
      <Typography sx={style.bottomText}>Already have an account?{""}
        <Button sx={style.signInForgetButton} onClick={() => { setMode('login') }}>Sign in</Button>
      </Typography>

    </>
  )
}

export default Register

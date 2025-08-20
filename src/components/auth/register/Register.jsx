import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import validationSchema from './validation';
import inputs from './inputs';
import Input from '../../common/Input';
import { styles } from './styles';
import { renderInput1, renderInput2 } from './authFormInputs.jsx'; // عدّل المسار حسب مشروعك
function Register() {
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
        <Typography sx={style.title}>Join the ARABOON</Typography>
        <Typography sx={style.subtitle}>Create your account and unlock your potential</Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
        {serverError && (
          <Alert severity="error" sx={style.errorAlert}>
            {serverError}
          </Alert>
        )}
        {renderInput1(formik)}
        {renderInput2(formik, inputs)}

        {/* Bottom text */}
        <Typography sx={style.bottomText}>Already have an account?{" "}
          <Button sx={style.signInButton}>Sign in</Button>
        </Typography>
        {/* Submit Button */}
        <Button type="submit" sx={style.submitButton}>Create Account</Button>
      </Box>

    </>
  )
}

export default Register

import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getValidations } from '../../auth/shared/validations';
import RenderFields from '../../auth/shared/RenderFields';
import { changePasswordFields } from '../../auth/shared/formFields';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
function ChangePassword({ open, setOpen }) {
    const theme = useTheme()
    const { t,i18n } = useTranslation()
    const validations=getValidations(t)
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)
    const style = {
        dialogPaper: {
            border: theme.palette.mode === 'dark' ? "1px solid rgba(183, 28, 28, 0.30)" : "1px solid rgba(12, 112, 122, 0.30)",
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: "100vh",
            maxWidth: "450px",
            m: 0,
            p: 0,
        },
        title: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: "30px",
            textAlign: "center",
            fontWeight: 700,
            mb: 1,
        },
        errorAlert: {
            mb: 2,
            bgcolor: "#FFE9D5",
            color: "#7A0916",
            width: "100%",
        },
        submitButton: {
            width: "100%",
            bgcolor: "primary.main",
            color: "#fff",
            fontSize: "15px",
            fontFamily: '"Roboto", sans-serif',
            boxShadow: theme.palette.mode === 'dark' ? "0 4px 6px rgba(183,28,28,0.3)" : "0 4px 6px rgba(12,112,222,0.3)",
            "&:hover": { bgcolor: theme.palette.mode === 'dark' ? "#d32f2f" : "#2688f0" },
            transition: "all 0.3s",
            textTransform: "none",
        },
    }
    const initialValues = {
        currentPassword: '',
        password: '',
        confirmPassword: ''
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setServerError(null)
        setLoading(true)
        const payload = {
            currentPassword: values.currentPassword,
            newPassword: values.password,
            confirmNewPassword: values.confirmPassword,
        }
        console.log(payload)
        try {
            const { data } = await api.patch('/Users/change-password', payload)
            toast.success(data.message)
            handleClose()
        } catch (error) {
            console.log(error)
            if (error?.response?.data?.errors) {
                setServerError(error?.response?.data?.errors?.CurrentPassword[0])
            } else if (error?.response?.data?.message) {
                setServerError(error?.response?.data?.message)
            } else {
                setServerError("somthing went wrong")
            }
        } finally {
            setLoading(false)
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validations.changePassword
    });
    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            PaperProps={{ sx: style.dialogPaper }}
        >
            <DialogContent>
                <IconButton onClick={() => { handleClose()}} sx={{ position: 'absolute', top: 5, ...(i18n.language === 'en' ? { right: 5 } : { left: 5 }) }}>
                    <Close />
                </IconButton>
                <Typography sx={style.title}>{t("profile.change_password")}</Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                    {serverError && (
                        <Alert severity="error" sx={style.errorAlert}>
                            {serverError}
                        </Alert>
                    )}
                    <RenderFields formik={formik} fields={changePasswordFields} />
                    <Button loading={loading} type="submit" sx={{ ...style.submitButton, }}>{t('profile.change_password')}</Button>

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ChangePassword

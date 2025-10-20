import Register from '../../auth/Register'
import { Alert, Box, Button, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getValidations } from '../../auth/shared/validations';
import { styles } from './styles';
import RenderFields from '../../auth/shared/RenderFields';
import { userInformationFields } from '../../auth/shared/formFields';
import { useTranslation } from 'react-i18next';
import { Save } from '@mui/icons-material';
import { useInfoOnSubmit } from './useInfoOnSubmit';
import ChangePassword from './ChangePassword';
function EditUserInformation({ userInfo, setUserInfo }) {
    const [isEdit, setIsEdit] = useState(false)
    const { t } = useTranslation()
    const validations=getValidations(t)
    const theme = useTheme()
    const [serverError, setServerError] = useState(null);
    const style = styles(theme)
    const [loading, setLoading] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const initialValues = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userName: userInfo.userName,
        email: userInfo.email,
        bio: userInfo.bio,
    };
    console.log(userInfo.bio)


    const formik = useFormik({
        initialValues,
        onSubmit: (values) => useInfoOnSubmit(values, getModifiedFields, setIsEdit, setUserInfo, setServerError, setLoading),
        validationSchema: validations.userInformation,
    });
    const getModifiedFields = () => {
        //return the key if changed that mean return the name of the field
        return Object.keys(formik.values).filter(
            key => formik.values[key] !== userInfo[key]
        );
    };


    return (
        <>
            <Box sx={style.container} >
                <Box sx={style.header}>
                    <Typography sx={style.title}>{t("profile.profile_information")}</Typography>
                    {!isEdit ? (
                        <Button type="button" variant="contained" sx={{ bgcolor: 'background.default' }} onClick={() => setIsEdit(true)}>
                            {t("profile.update_profile")}
                        </Button>
                    ) : (
                        <Button type="submit" variant="contained" loadingPosition="start" loading={loading} sx={{ bgcolor: "primary.main" }} onClick={() => formik.handleSubmit()}>
                            <Save sx={{ mx: 1 }} />{t("profile.save_changes")}
                        </Button>
                    )}
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={formik.handleSubmit} sx={style.form}>
                    {serverError && (
                        <Alert severity="error" sx={style.errorAlert}>
                            {serverError}
                        </Alert>
                    )}

                    <RenderFields formik={formik} fields={userInformationFields} isEdit={isEdit} />
                </Box>
                {isEdit && (
                    <Button onClick={()=>{setOpenChangePassword(true)}} type="button" sx={style.submitButton}>{t("profile.change_password")}</Button>
                )}
            </Box>
            <ChangePassword open={openChangePassword} setOpen={setOpenChangePassword} />

        </>
    )
}

export default EditUserInformation

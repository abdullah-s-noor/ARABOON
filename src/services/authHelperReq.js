import { toast } from 'react-toastify';
import { api } from './api';
import { jwtDecode } from 'jwt-decode';

export const handleAuthSubmit = async ({ endpoint, payload, setServerError, setSubmitting, successMessage, setMode, nextMode, login, t = null, nextPath = null, setNextPath=null, navigate = null ,setContextLoading=null}) => {
    setServerError(null);
    try {
        const { data } = await api.post(endpoint, payload);
        console.log(data)
        toast.success(data.message);
        setMode(nextMode)
        if (nextMode === 'close') {
            const isAdmin = jwtDecode(data.data.access)["Role"]==="Admin";
            if (nextPath) {
                navigate(nextPath,{replace:true});
                if (isAdmin) {
                    setContextLoading(true);
                }
                setNextPath(null)
            }
            else {
                if (isAdmin) {
                    navigate("/dashboard");
                    setContextLoading(true);
                }
            }
            login(data.data.access)

        }
        return data;
    } catch (error) {
        console.log(error);
        const errors = error.response?.data?.errors;
        if (errors) {
            const userNameError = errors?.userName?.[0];
            const emailError = errors?.email?.[0];
            const passwordError = errors?.password?.[0];
            setServerError(userNameError || emailError || passwordError || 'Something went wrong.');
        } else if (error.response?.data?.message) {
            console.log(error.response?.data?.status)
            if (error.response?.data?.message === "Email not confirmed" || error.response?.data?.message === "البريد الإلكتروني غير مُؤكد") {
                await resendEmailConfirmation(payload.userName, t)
            }
            setServerError(error.response.data.message);
        } else {
            setServerError('Something went wrong. Please try again.');
        }
    } finally {
        setSubmitting(false);
    }
};

const resendEmailConfirmation = async (userName, t) => {
    try {
        const { data } = await api.post('/Authentication/SendConfirmationEmail', { userName: userName })
        console.log(data)
        toast.warn(t("account_not_confirmed"));
    } catch (error) {
        console.log(error)
    }
}
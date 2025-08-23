import { toast } from 'react-toastify';
import { api } from './api';

export const handleAuthSubmit = async ({ endpoint, payload, setServerError, setSubmitting, successMessage, setMode, nextMode,setUserToken=null }) => {
    setServerError(null);
    try {
        const { data } = await api.post(endpoint, payload);
        console.log(data)
        toast.success(data.message);
        setMode(nextMode)
        if(nextMode==='close'){
            setUserToken(data.data.accessToken)
            localStorage.setItem("userToken",data.data.accessToken)
        }
        return data;
    } catch (error) {
        console.log(error);
        const Errors = error.response?.data?.Errors;
        if (Errors) {
            const userNameError = Errors?.UserName?.[0];
            const emailError = Errors?.Email?.[0];
            const passwordError = Errors?.Password?.[0];
            setServerError(userNameError || emailError || passwordError || 'Something went wrong.');
        } else if (error.response?.data?.message) {
            console.log(error.response?.data?.status)
            if (error.response?.data?.message==="Email not confirmed") {
                await resendEmailConfirmation(payload.userName)
            }
            setServerError(error.response.data.message);
        } else {
            setServerError('Something went wrong. Please try again.');
        }
    } finally {
        setSubmitting(false);
    }
};

const resendEmailConfirmation = async(userName) => {
    try{
        const {data} =await api.post('/Authentication/SendConfirmationEmail',{userName:userName})
        console.log(data)
        toast.warn('Your account is not confirmed. Please check your email.');
    }catch(error){
        console.log(error)
    }
}
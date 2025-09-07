import { toast } from 'react-toastify';
import { api } from './api';

export const handleAuthSubmit = async ({ endpoint, payload, setServerError, setSubmitting, successMessage, setMode, nextMode,login }) => {
    setServerError(null);
    try {
        const { data } = await api.post(endpoint, payload);
        console.log(data)
        toast.success(data.message);
        setMode(nextMode)
        if(nextMode==='close'){
            login(data.data.access)
        }
        return data;
    } catch (error) {
        console.log(error);
        const errors = error.response?.data?.errors;
        if (errors) {
            const userNameError = errors?.UserName?.[0];
            const emailError = errors?.Email?.[0];
            const passwordError = errors?.Password?.[0];
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
import { api } from "../../../services/api"; 
import { toast } from "react-toastify";

export const useInfoOnSubmit = async (values, getModifiedFields, setIsEdit, setUserInfo,setServerError,setLoading) => {
    setLoading(true)
    const modifiedFields = getModifiedFields();

    if (modifiedFields.length === 0) {
        setIsEdit(false);
        setServerError(null)
        setLoading(false)
        return;
    }

    let urlFullName = "/users/change-name";
    let urlUserName = "/users/change-username";
    let urlEmail = "/users/change-email";
    let urlBio = "/users/change-bio";

    try {

        if (modifiedFields.includes("firstName") || modifiedFields.includes("lastName")) {
            await(api.patch(urlFullName, {
                firstName: values.firstName,
                lastName: values.lastName
            }));
        }

        if (modifiedFields.includes("userName")) {
            await(api.patch(urlUserName, { userName: values.userName }));
        }

        if (modifiedFields.includes("email")) {
            await(api.patch(urlEmail, { email: values.email }));
        }

        if (modifiedFields.includes("bio")) {
            await (api.patch(urlBio, { bio: values.bio }));
        }

        setUserInfo(values)

        toast.success("Profile updated successfully!");
        setIsEdit(false);
        setServerError(null)
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
            setServerError(error.response.data.message);
        } else {
            setServerError('Something went wrong. Please try again.');
        }
    }finally{
        setLoading(false)
    }
};

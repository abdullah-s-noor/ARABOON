// تعريف كل الحقول المشتركة
export const fields = {
    firstName: { type: "text", title: "First Name", id: "firstName", name: "firstName" },
    lastName: { type: "text", title: "Last Name", id: "lastName", name: "lastName" },
    userName: { type: "text", title: "Username", id: "userName", name: "userName" },
    email: { type: "email", title: "Email", id: "email", name: "email" },
    password: { type: "password", title: "Password", id: "password", name: "password" },
    confirmPassword: { type: "password", title: "Confirm Password", id: "confirmPassword", name: "confirmPassword" },
};

// arrays للفورمز المختلفة
export const registerFields = [
    fields.firstName,
    fields.lastName,
    fields.userName,
    fields.email,
    fields.password,
    fields.confirmPassword,
];

export const loginFields = [
    fields.userName,
    fields.password,
];

export const resetPasswordFields = [
    fields.password,
    fields.confirmPassword,
];

export const forgetPasswordFields = [
    fields.email,
];

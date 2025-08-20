const inputs = (formik) => [
  {
    type: 'text',
    title: 'First Name:',
    id: 'firstName',
    name: 'firstName',
    value: formik.values.firstName
  },
  {
    type: 'text',
    title: 'Last Name:',
    id: 'lastName',
    name: 'lastName',
    value: formik.values.lastName
  },
  {
    type: 'text',
    title: 'Username:',
    id: 'userName',
    name: 'userName',
    value: formik.values.userName
  },
  {
    type: 'email',
    title: 'Email:',
    id: 'email',
    name: 'email',
    value: formik.values.email
  },
  {
    type: 'password',
    title: 'Password:',
    id: 'password',
    name: 'password',
    value: formik.values.password
  },
  {
    type: 'password',
    title: 'Confirm Password:',
    id: 'confirmPassword',
    name: 'confirmPassword',
    value: formik.values.confirmPassword
  }
];

export default inputs;

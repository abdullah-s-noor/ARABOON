const inputs = (formik) => [
  {
    type: 'text',
    title: 'Username:',
    id: 'userName',
    name: 'userName',
    value: formik.values.userName
  },
  {
    type: 'password',
    title: 'Password:',
    id: 'password',
    name: 'password',
    value: formik.values.password
  },
];

export default inputs;

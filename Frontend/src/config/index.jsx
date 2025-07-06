export const signUpFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your name',
    type: 'text',
    componentType: 'input'
  },
  {
    name: 'userEmail',
    label: 'User Email',
    placeholder: 'Enter your email',
    type: 'text',
    componentType: 'input'
  },
  {
    name: 'password',
    label: 'password',
    placeholder: 'Enter your password',
    type: 'text',
    componentType: 'input'
  },
]

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
export const initialSignInFormData = {
  userEmail: "",
  password: "",
};
import * as Yup from 'yup'

export const DisplayingRegisterErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()

    .min(8, 'Must contain atleast 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain one uppercase, one lowercase, one number and one special case character'
    )
    .required('Required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
})

export const DisplayingLoginErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
  password: Yup.string()

    .min(8, 'Must contain atleast 8 characters')
    .required('Required'),
})

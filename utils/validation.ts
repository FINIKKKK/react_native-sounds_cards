import * as yup from 'yup';

/**
 * --------------------------------
 * Схемы валидации
 * --------------------------------
 */

/**
 * Авторизация
 */
export const LoginScheme = yup.object().shape({
  email: yup.string().required('required').email('email'),
  password: yup.string().min(6, 'password').required('required'),
});

/**
 * Регистрация
 */
export const RegisterScheme = yup.object().shape({
  email: yup.string().required('required').email('email'),
  password: yup.string().required('required').min(6, 'password'),
  repeat_password: yup.string().required('required').min(6, 'repeat_password'),
});

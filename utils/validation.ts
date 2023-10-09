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
  email: yup
    .string()
    .required('Email обязателен')
    .email('Введите корректный Email'),
  password: yup
    .string()
    .required('Пароль обязателен'),
});

/**
 * Регистрация
 */
export const RegisterScheme = yup.object().shape({
  first_name: yup.string().required('Имя обязательно'),
  email: yup
    .string()
    .required('Email обязателен')
    .email('Введите корректный Email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});

/**
 * Создание категории
 */
export const CategoryScheme = yup.object().shape({
  image: yup.string().required('Выберите иображение'),
  name: yup.string().required('Название обязательно').min(6, 'Пароль должен содержать минимум 6 символов'),
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout, ssAuth } from '~layouts/auth';
import { useValidation } from '~hooks/useValidation';
import { RegisterScheme } from '~utils/validation';
import { useCustomFetch } from '~hooks/useFetch';
import { TUser } from '~types/account';
import * as SecureStore from 'expo-secure-store';
import { useActions } from '~hooks/useActions';
import { Link, router } from 'expo-router';
import axios from '~node_modules/axios';
import { TCategory } from '~types/category';

/**
 * RegisterScreen ----------------
 */
export default function RegisterScreen() {
  /**
   * Переменные ----------------
   */
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { errors, validateForm } = useValidation();
  const { errorsRequest, useFetch } = useCustomFetch();
  const { setUserData } = useActions();

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = (await useFetch(`account`)) as TUser;

      if (data) {
        // Сохраняем в хранилище данные пользователя
        setUserData(data);
        // Перенаправление на основную страницу
        router.replace('/categories');
      }
    })();
  }, []);

  /**
   * Методы ----------------
   */
  // Зарегистрировать пользователя
  const onRegister = async () => {
    // Данные
    const dto = {
      first_name: name,
      email,
      password,
    };

    // Валидируем данные
    const isValid = await validateForm(dto, RegisterScheme);
    if (!isValid) return false;

    // Зарегистрировать пользователя
    const data = (await useFetch('/account/register', {
      data: dto,
      method: 'POST',
    })) as TUser;

    if (data) {
      // Сохранем токен
      await SecureStore.setItemAsync('token', data.token);
      // Сохраняем данные пользователя
      setUserData(data);
      // Перенаправление на основную страницу
      router.replace('/categories');
    }
  };

  return (
    <AuthLayout
      text={
        <CText style={[ss.text]}>
          Уже есть аккаунт?{' '}
          <CLink href="/login" style={[ss.link]}>
            Войти в аккаунт
          </CLink>
        </CText>
      }
    >
      <Link href="/categories">Categories</Link>

      {errorsRequest?.map((error: string, index: number) =>
        error === 'The provided credentials are incorrect.' ? (
          <CText key={index} style={[ssAuth.error]}>
            Неверная почта или пароль
          </CText>
        ) : (
          <CText key={index} style={[ssAuth.error]}>
            {error}
          </CText>
        ),
      )}

      <Input
        label="Имя"
        onChangeText={(text) => setName(text)}
        value={name}
        errors={errors['first_name']}
      />
      <Input
        label="E-mail"
        onChangeText={(text) => setEmail(text)}
        errors={errors['email']}
      />
      <Input
        label="Пароль"
        onChangeText={(text) => setPassword(text)}
        type="password"
        value={password}
        errors={errors['password']}
      />
      <Btn
        label="Создать аккаунт"
        style={{ marginTop: 15 }}
        onPress={onRegister}
      />
    </AuthLayout>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  link: {},
  form: {},
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

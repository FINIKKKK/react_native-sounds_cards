import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout } from '~layouts/auth';
import { useValidation } from '~hooks/useValidation';
import { useCustomFetch } from '~hooks/useFetch';
import { LoginScheme } from '~utils/validation';
import * as SecureStore from '~node_modules/expo-secure-store';
import { router } from 'expo-router';
import { useActions } from '~hooks/useActions';
import { TUser } from '~types/account';

/**
 * LoginScreen ----------------
 */
export default function LoginScreen() {
  /**
   * Переменные ----------------
   */
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { errors, validateForm } = useValidation();
  const { useFetch } = useCustomFetch();
  const { setUserData } = useActions();

  /**
   * Методы ----------------
   */
  // Авторизировать пользователя
  const onLogin = async () => {
    // Данные
    const dto = {
      email,
      password,
    };

    // Валидируем данные
    const isValid = await validateForm(dto, LoginScheme);
    if (!isValid) return false;

    // Авторизировать пользователя
    const { data }: { data: TUser } = await useFetch('/account/login', {
      data: dto,
      method: 'POST',
    });

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
          Еще нет аккаунта?{' '}
          <CLink href="/" style={[ss.link]}>
            Создайте аккаунт
          </CLink>
        </CText>
      }
    >
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
      <CLink href="/forgot" style={[ss.forgot]}>
        Забыли пароль?
      </CLink>
      <Btn label="Продолжить" style={{ marginTop: 15 }} onPress={onLogin} />
    </AuthLayout>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  link: {},
  form: {},
  forgot: {
    marginTop: -10,
    marginBottom: 5
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout } from '~layouts/auth';
import { useValidation } from '~hooks/useValidation';
import { useCustomFetch } from '~hooks/useFetch';
import { LoginScheme } from '~utils/validation';
import { TAuthData } from '~types/account';

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
    const data: TAuthData = await useFetch('/account/login', {
      data: dto,
      method: 'POST',
    });

    if (data) {
    }
  };

  return (
    <AuthLayout
      text={
        <CText style={[ss.text]}>
          Еще нет аккаунта?{' '}
          <CLink href="/index" style={[ss.link]}>
            Создайте аккаунт
          </CLink>{' '}
        </CText>
      }
    >
      <Input label="E-mail" onChangeText={(text) => setEmail(text)} />
      <Input
        label="Пароль"
        onChangeText={(text) => setPassword(text)}
        type="password"
        value={password}
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
  forgot: {},
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

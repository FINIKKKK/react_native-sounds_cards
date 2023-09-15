import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout } from '~layouts/auth';
import { useValidation } from '~hooks/useValidation';
import { RegisterScheme } from '~utils/validation';
import { useCustomFetch } from '~hooks/useFetch';
import { TAuthData } from '~types/account';

/**
 * RegisterScreen ----------------
 */
export default function RegisterScreen() {
  /**
   * Переменные ----------------
   */
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const { errors, validateForm } = useValidation();
  const { useFetch } = useCustomFetch();

  /**
   * Методы ----------------
   */
  // Зарегистрировать пользователя
  const onRegister = async () => {
    // Данные
    const dto = {
      email,
      password,
      repeat_password: repeatPassword,
    };

    // Валидируем данные
    const isValid = await validateForm(dto, RegisterScheme);
    if (!isValid) return false;

    // Зарегистрировать пользователя
    const data: TAuthData = await useFetch('/account/register', {
      data: dto,
      method: 'POST',
    });

    if(data) {

    }
  };

  return (
    <AuthLayout
      text={
        <CText style={[ss.text]}>
          Уже есть аккаунт?{' '}
          <CLink href="/login" style={[ss.link]}>
            Войти в аккаунт
          </CLink>{' '}
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
      <Input
        label="Повторите пароль"
        onChangeText={(text) => setRepeatPassword(text)}
        type="password"
        value={repeatPassword}
        errors={errors['repeat_password']}
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

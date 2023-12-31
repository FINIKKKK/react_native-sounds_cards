import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout, ssAuth } from '~layouts/auth';
import { useValidation } from '~hooks/useValidation';
import { useCustomFetch } from '~hooks/useFetch';
import { LoginScheme } from '~utils/validation';
import * as SecureStore from '~node_modules/expo-secure-store';
import { router } from 'expo-router';
import { useActions } from '~hooks/useActions';
import { TUser } from '~types/account';
import {useTranslate} from "~hooks/useTranslate";
import {AuthLang} from "~lang/auth";

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
  const { errorsRequest, useFetch } = useCustomFetch();
  const { setUserData } = useActions();
  const $t = useTranslate(AuthLang);

  /**
   * Методы ----------------
   */
  // Авторизировать пользователя
  const onLogin = async () => {
    // Преобразовываем переменные
    setEmail(email.trim().toLowerCase());
    setPassword(password.trim());

    // Данные
    const dto = {
      email,
      password,
    };

    // Валидируем данные
    const isValid = await validateForm(dto, LoginScheme);
    if (!isValid) return false;

    // Авторизировать пользователя
    const data = (await useFetch('account/auth', {
      body: dto,
      method: 'POST',
    })) as TUser;

    if (data) {
      // Сохранем токен
      await SecureStore.setItemAsync('token', data.token);
      // Сохраняем данные пользователя
      setUserData(data);
      // Перенаправление на основную страницу
      await router.replace('/categories');
    }
  };

  return (
    <AuthLayout
      text={
        <CText style={[ss.text]}>
          {$t?.no_account_title}{' '}
          <CLink href="/" style={[ss.link]}>
            {$t?.no_account_link}
          </CLink>
        </CText>
      }
    >
      {errorsRequest?.map((error: string, index: number) =>
        error === 'The email has already been taken.' ? (
          <CText key={index} style={[ssAuth.error]}>
            Данная почта уже используется
          </CText>
        ) : (
          <CText key={index} style={[ssAuth.error]}>
            {error}
          </CText>
        ),
      )}

      <Input
        label={$t?.email}
        onChangeText={(text) => setEmail(text)}
        errors={errors['email']}
        value={email}
      />
      <Input
        label={$t?.password}
        onChangeText={(text) => setPassword(text)}
        type="password"
        value={password}
        errors={errors['password']}
      />
      <CLink href="/forgot" style={[ss.forgot]}>
        {$t?.forget}
      </CLink>
      <Btn label={$t?.continue} style={{ marginTop: 15 }} onPress={onLogin} />
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
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout } from '~layouts/auth';

/**
 * RegisterScreen ----------------
 */
export default function RegisterScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

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
      <Input label="E-mail" onChangeText={(text) => setEmail(text)} />
      <Input
        label="Пароль"
        onChangeText={(text) => setPassword(text)}
        type="password"
        value={password}
      />
      <Input
        label="Повторите пароль"
        onChangeText={(text) => setRepeatPassword(text)}
        type="password"
        value={repeatPassword}
      />
      <Btn label="Создать аккаунт" style={{ marginTop: 15 }} />
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

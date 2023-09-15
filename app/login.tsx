import React from 'react';
import { StyleSheet } from 'react-native';
import { Btn, CLink, CText, Input } from '~components/UI';
import { AuthLayout } from '~layouts/auth';

/**
 * LoginScreen ----------------
 */
export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
      <Btn label="Продолжить" style={{ marginTop: 15 }} />
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

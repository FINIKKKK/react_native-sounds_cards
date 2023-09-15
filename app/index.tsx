import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout } from '~layouts/main';
import { Btn, CText, Input, Title } from '~components/UI';
import { colors } from '~constants';
import { Link } from 'expo-router';

/**
 * RegisterScreen ----------------
 */
export default function RegisterScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  return (
    <MainLayout>
      <View style={[ss.container]}>
        <View style={[ss.header]}>
          <Title style={[ss.logo]}>LetMeTalk</Title>
          <CText style={[ss.text]}>
            Еще нет аккаунта?
            <Link href="/login" style={[ss.link]}> Создайте аккаунт</Link>
          </CText>
        </View>

        <View style={[ss.form]}>
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
          <CText style={[ss.forgot]}>Забыли пароль?</CText>
          <Btn label="Продолжить" />
          <CText style={[ss.or]}>Или</CText>
          <Btn label="Войти с помощью Google" type="google" />
        </View>
      </View>
    </MainLayout>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 25,
  },
  logo: {
    color: colors.blue,
    fontSize: 46,
    lineHeight: 60,
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  link: {
    color: colors.blue
  },
  form: {},
  forgot: {
    color: colors.blue,
    marginBottom: 25,
  },
  or: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

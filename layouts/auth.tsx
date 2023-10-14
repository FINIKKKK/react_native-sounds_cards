import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Btn, CText } from '~components/UI';
import { colors } from '~constants';
import { MainLayout } from '~layouts/main';
import { AuthLang } from '~lang/auth';
import { useTranslate } from '~hooks/useTranslate';

export interface AuthLayoutProps {
  children: React.ReactNode;
  text: React.ReactNode;
}

/**
 * AuthLayout ----------------
 */
export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const $t = useTranslate(AuthLang);

  return (
    <MainLayout bg={colors.white}>
      <View style={[ss.container]}>
        <View style={[ss.header]}>
          <CText style={[ss.logo]}>LetMeTalk</CText>
          {props.text}
        </View>

        <View style={[ss.form]}>
          {props.children}

          <CText style={[ss.or]}>{$t?.or}</CText>
          <Btn label={$t?.google} type="google" />
        </View>
      </View>
    </MainLayout>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
  },
  header: {
    marginTop: 25,
  },
  logo: {
    color: colors.blue,
    fontSize: 46,
    lineHeight: 60,
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  link: {},
  form: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  or: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

/**
 * Styles ----------------
 */
export const ssAuth = StyleSheet.create({
  error: {
    color: colors.red,
    marginBottom: 5,
  },
});

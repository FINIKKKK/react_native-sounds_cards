import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '~constants';

interface LinkProps {
  children: React.ReactNode;
  href: string;
  style?: TextStyle | TextStyle[];
}

/**
 * Link ----------------
 */
export const CLink: React.FC<LinkProps> = (props) => {
  return (
    <Link
      href={props.href as any}
      style={[ss.link, props.style && props.style]}
    >
      {props.children}
    </Link>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  link: {
    color: colors.blue,
  },
});

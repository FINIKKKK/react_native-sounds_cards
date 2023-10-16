import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { CText, Icon } from '~components/UI';
import { colors } from '~constants';
import { useSelectors } from '~hooks/useSelectors';
import { ViewStyle } from '~node_modules/react-native';

interface HeaderProps {
  title: string;
  link: string;
  style?: ViewStyle | ViewStyle[];
}

/**
 * Header ----------------
 */
export const Header: React.FC<HeaderProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { lang } = useSelectors((state) => state.account);
  const backTitle = lang === 'ru' ? 'Назад' : 'Артқа';

  return (
    <View style={[ss.header, props.style]}>
      <Link href={props.link} style={[ss.back_wrapper]}>
        <View style={[ss.back]}>
          <Icon
            name="chevron-back-sharp"
            type="ionic"
            color={colors.black}
            size={30}
            style={[ss.back_icon]}
          />
          <CText style={[ss.back_text]}>{backTitle}</CText>
        </View>
      </Link>
      <CText style={[ss.header_text]}>{props.title}</CText>
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  header: {
    position: 'relative',
    marginBottom: 40,
    marginTop: 48,
  },
  back_wrapper: {
    position: 'absolute',
    top: 0,
    left: -5,
    zIndex: 10,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_icon: {},
  back_text: {},
  header_text: {
    fontFamily: 'Bold',
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
  },
});

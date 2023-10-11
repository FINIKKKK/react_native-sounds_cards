import { Dimensions, StyleSheet } from 'react-native';
import { blocks, colors } from '~constants';

/**
 * Styles Settings ----------------
 */
export const ssSettings = StyleSheet.create({
  block: {
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 72,
    width: (Dimensions.get('window').width - 40 - 8) / 2,
    borderRadius: blocks.radius,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  active: {
    borderWidth: 2,
    borderColor: colors.blue,
  },
  card_text: {
    fontSize: 18,
  },
});

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import { MainLayout } from '~layouts/main';
import { Btn, Icon, Input } from '~components/UI';
import { router } from 'expo-router';
import { blocks, colors } from '~constants';

/**
 * AddCategoryScreen ----------------
 */
export default function AddCategoryScreen() {
  /**
   * Переменные ----------------
   */
  const [name, setName] = React.useState('');

  return (
    <MainLayout>
      <View style={[ss.container]}>
        <View style={[ss.form]}>
          <TouchableNativeFeedback>
            <View style={[ss.add]}>
              <Icon name="plus" type="ant" color={colors.black} size={60} />
            </View>
          </TouchableNativeFeedback>
          <Input
            label="Название категории"
            onChangeText={(text) => setName(text)}
            style={[ss.input]}
          />
        </View>

        <View style={[ss.controls]}>
          <Btn
            label="Отменить"
            type="white"
            onPress={() => router.replace('/categories')}
            style={{ marginBottom: 10 }}
          />
          <Btn label="Добавить категорию" />
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
    paddingHorizontal: 20,
    paddingVertical: 34,
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 120 - 20 - 34 * 2 - 20,
  },
  add: {
    borderRadius: blocks.radius,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#C4CFE8',
    width: 254,
    height: 254,
    marginBottom: 20,
    backgroundColor: '#DCE2EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 254,
  },
  controls: {},
});

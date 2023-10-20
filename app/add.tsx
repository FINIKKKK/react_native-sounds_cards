import React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { MainLayout } from '~layouts/main';
import { Btn, CText, Icon, Input } from '~components/UI';
import { router } from 'expo-router';
import { blocks, colors } from '~constants';
import * as ImagePicker from 'expo-image-picker';
import { useCustomFetch } from '~hooks/useFetch';
import { useValidation } from '~hooks/useValidation';
import { CategoryScheme } from '~utils/validation';
import { Text } from '~node_modules/react-native';
import { TCategory } from '~types/category';
import axios from 'axios';
import * as SecureStore from '~node_modules/expo-secure-store';
import { AddLang } from '~lang/add';
import { useTranslate } from '~hooks/useTranslate';

/**
 * AddCategoryScreen ----------------
 */
export default function AddCategoryScreen() {
  /**
   * Переменные ----------------
   */
  const [name, setName] = React.useState('');
  const { useFetch } = useCustomFetch();
  const [image, setImage] = React.useState<any>(null);
  const { errors, validateForm } = useValidation();
  const $t = useTranslate(AddLang);

  /**
   * Методы ----------------
   */
  // Выбрать изображение
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  // Создать категорию
  const onCreateCategory = async () => {
    // Данные
    const dto = {
      image: image.assets[0].uri,
      name,
    };

    // Валидируем данные
    const isValid = await validateForm(dto, CategoryScheme);
    if (!isValid) return false;

    // Создать категорию
    const category = (await useFetch('category/store', {
      body: {
        name: [{ ru: name }],
      },
      method: 'POST',
    })) as TCategory;

    console.log('category', category);

    // Файл изображения
    const uri =
      Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '');
    const filename = image.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

    // Загружаем изображение
    const uploadImage = await useFetch('upload', {
      form: {
        file: {
          uri,
          name: `image.${ext}`,
          type,
        },
        entity: 'category',
        entity_id: category.id,
      },
      method: 'POST',
    });
    if (uploadImage) {
      console.log('image', uploadImage);
      await router.replace('/categories');
    }
  };

  return (
    <MainLayout>
      <View style={[ss.container]}>
        <View style={[ss.form]}>
          <View style={[ss.add_wrapper]}>
            <View
              style={[
                ss.add,
                !image && ss.add_border,
                !!errors['image']?.length && ss.img_error,
              ]}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(colors.bg, true)}
                onPress={pickImageAsync}
              >
                <View
                  style={[
                    ss.add,
                    !image && ss.add_border,
                    !!errors['image']?.length && ss.img_error,
                  ]}
                >
                  {image ? (
                    <Image
                      source={{
                        uri: image.assets[0].uri,
                      }}
                      style={[ss.img]}
                    />
                  ) : (
                    <Icon
                      name="plus"
                      type="ant"
                      color={colors.black}
                      size={60}
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
            {!!errors['image']?.length && (
              <Text style={ss.error}>{errors['image'][0]}</Text>
            )}
          </View>
          <Input
            label={$t?.name_category}
            onChangeText={(text) => setName(text)}
            style={[ss.input, { marginTop: 20 }]}
            errors={errors['name']}
          />
        </View>

        <View style={[ss.controls]}>
          <Btn
            label={$t?.cancel}
            type="white"
            onPress={() => router.replace('/categories')}
            style={{ marginBottom: 10 }}
          />
          <Btn label={$t?.add_category} onPress={onCreateCategory} />
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
    height: Dimensions.get('window').height - Dimensions.get('window').width / 1.8 - 60,
  },
  add_wrapper: {},
  add: {
    width: Dimensions.get('window').width / 1.8,
    height: Dimensions.get('window').width / 1.8,
    backgroundColor: '#DCE2EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: blocks.radius,
  },
  add_border: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#C4CFE8',
  },
  img_error: {
    borderColor: colors.red,
    backgroundColor: '#F9CBCB',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: blocks.radius,
  },
  input: {
    width: 254,
  },
  controls: {},
  error: {
    color: colors.red,
    fontSize: 11,
  },
});

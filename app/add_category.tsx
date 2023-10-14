import React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  Image,
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
import * as SecureStore from "~node_modules/expo-secure-store";

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

  /**
   * Методы ----------------
   */
  // Выбрать изображение
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.uri);
      console.log('result', result.uri);
      // const data = await useFetch('upload', {
      //   data: {
      //     entity: 'category',
      //     entity_id: 11,
      //   },
      //   method: 'POST',
      // });
    }
  };

  // Создать категорию
  const onCreateCategory = async () => {
    // Данные
    // const dto = {
    //   image,
    //   name,
    // };
    //
    // // Валидируем данные
    // const isValid = await validateForm(dto, CategoryScheme);
    // if (!isValid) return false;

    // Создать категорию
    // const data = await useFetch('category/store', {
    //   data: {
    //     // name: [{ ru: name }],
    //     name: { ru: name },
    //   },
    //   method: 'POST',
    // });
    //
    // const data = await useFetch('upload', {
    //
    //   data: {
    //     entity: 'category',
    //     entity_id: 11
    //   },
    //   method: 'POST',
    // });
    //
    // if (data) {
    //   console.log(data);
    // }

    const formData = new FormData();
    formData.append('file', image);
    formData.append(' entity', 'category');
    formData.append('entity_id', 11);

    const token = await SecureStore.getItemAsync('token');

    try {
      const response = await axios.post(
        'https://api.lmt.app.itl.systems/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Обработка успешной загрузки изображения
      console.log('Изображение успешно загружено:', response.data);
    } catch (error) {
      // Обработка ошибок загрузки
      console.error('Ошибка при загрузке изображения:', error);
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
                        uri: image,
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
            label="Название категории"
            onChangeText={(text) => setName(text)}
            style={[ss.input, { marginTop: 20 }]}
            errors={errors['name']}
          />
        </View>

        <View style={[ss.controls]}>
          <Btn
            label="Отменить"
            type="white"
            onPress={() => router.replace('/categories')}
            style={{ marginBottom: 10 }}
          />
          <Btn label="Добавить категорию" onPress={onCreateCategory} />
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
  add_wrapper: {},
  add: {
    width: 254,
    height: 254,
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
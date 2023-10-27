import React from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

interface RequestData<T> {
  data: T;
}

// require('dotenv').config();
//
// export default {
//   extra: {
//     API_URL: process.env.API_URL,
//     YANDEX_API_KEY: process.env.YANDEX_API_KEY,
//   },
// };


/**
 * Хук для запросов
 */
export const useCustomFetch = <T>() => {
  /**
   * Переменные ----------------
   */
  const [data, setData] = React.useState<any | null>(null);
  const [errors, setErrors] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const API_URL = Constants?.expoConfig?.extra?.API_URL;

  /**
   * Хук отправки запроса ----------------
   */
  const useFetch = async (
    url: string,
    options?: {
      form?: Record<string, any>;
      body?: Record<string, any>;
      query?: Record<string, any>;
      method?: string;
    },
  ) => {
    // Устанавливаем загрузку
    setIsLoading(true);

    // Токен авторизации
    const token = await SecureStore.getItemAsync('token');

    // Проверяем, если метод GET, то преобразуем body в query параметры
    if ((!options?.method || options?.method === 'GET') && options?.query) {
      const queryParams = new URLSearchParams(options?.query);
      url = `${url}?${queryParams.toString()}`;
    }

    try {
      // Настройки запроса
      const fetchOptions: RequestInit = {
        method: options?.method || 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Если это formData
      if (options?.form) {
        const formData = new FormData();
        for (const key in options?.form) {
          formData.append(key, options?.form[key]);
        }
        fetchOptions.body = formData;
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'multipart/form-data',
        };
      }
      // Или просто тело запроса
      else if (options?.body) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'application/json',
        };
        fetchOptions.body = JSON.stringify(options.body);
      }

      // Вызываем запрос
      const response = await fetch(`https://api.lmt.app.itl.systems/${url}`, fetchOptions);

      if (response.ok) {
        // Преобразуем ответ в JSON
        const responseData: RequestData<T> = await response.json();

        // Сохраняем данные
        setData(responseData.data);
        // Очищаем ошибки
        setErrors(null);

        // Возвращаем данные
        return responseData.data;
      } else {
        // Обработка ошибок
        const errorData = await response.json();
        // Конвертируем ошибки
        const messagesArray: string[] = [];
        for (const key in errorData.messages) {
          messagesArray.push(...errorData.messages[key]);
        }
        // Сохраняем ошибки
        setErrors(messagesArray);
      }

      // Парсим JSON ответ
      const responseData: RequestData<T> = await response.json();

      // Сохраняем данные
      setData(responseData.data);
      // Очищаем ошибки
      setErrors(null);

      // Возвращаем данные
      return responseData.data;
    } catch (err: any) {
      // Показываем ошибки
      console.log(err);
    } finally {
      // Убираем загрузку
      setIsLoading(false);
    }
  };

  // Возвращаем функцию
  return { useFetch, data, errorsRequest: errors, isLoading };
};

import React from 'react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

interface RequestData<T> {
    data: T;
}

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

    /**
     * Функция отправки запроса ----------------
     */
    const useFetch = async (url: string, options?: AxiosRequestConfig) => {
        setIsLoading(true);
        try {
            const axiosOptions: AxiosRequestConfig = {
                baseURL: 'https://api.wiki.itl.systems', // Главный URL
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
                method: options?.method || 'GET',
                ...options,
            };

            const {data}: AxiosResponse<RequestData<T>> = await axios(
                url,
                axiosOptions,
            );
            setData(data);
            setErrors(null);
        } catch (err: any) {
            if (err.response) {
                // Конвертируем ошибки
                const messagesArray: string[] = [];
                for (const key in err.response.data.messages) {
                    messagesArray.push(...err.response.data.messages[key]);
                }
                setErrors(messagesArray);
            } else {
                setErrors(err.message);
            }
        } finally {
            setIsLoading(false);
        }

        // Возвращаем данные
        return data;
    };

    // Возвращаем функцию
    return {useFetch, errors, isLoading};
};

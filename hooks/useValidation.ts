import React from "react";

/**
 * Типы ----------------
 */
export interface FormErrors {
    [key: string]: string[];
}

/**
 * Хук для валидации формы и выполнения дополнительной логики
 */
export const useValidation = () => {
    const [errors, setErrors] = React.useState<FormErrors>({}); // Ошибки валидации

    // Функция валидации
    const validateForm = async (dto?: any, schema?: any) => {
        try {
            setErrors({}); // Обнуляем ошибки
            // Валидируем данные
            if (schema) {
                await schema.validate(dto, {abortEarly: false});
            }
            return true;
        } catch (err: any) {
            // Обрабатываем ошибки валидации
            if (err.inner) {
                // Приводим значение к одному виду
                const newErrors: FormErrors = {};
                err.inner.forEach((error: any) => {
                    const path = error.path;
                    if (!newErrors[path]) {
                        newErrors[path] = [];
                    }
                    newErrors[path].push(error.message);
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    // Возвращаем данные
    return {
        errors,
        setErrors,
        validateForm,
    };
};
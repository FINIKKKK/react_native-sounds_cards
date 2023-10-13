require('dotenv').config();

export default {
  extra: {
    API_URL: process.env.API_URL,
    YANDEX_API_KEY: process.env.YANDEX_API_KEY,
  },
};

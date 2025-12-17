import axios from "axios";
import 'dotenv/config';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  const lang = localStorage.getItem("lng") || "ru";
  // добавляем язык в query
  config.params = {
    ...(config.params || {}),
    lang, // добавляем или перезаписываем параметр lang
  };
  if (token) {
    // ставим ровно ОДИН правильный заголовок
    config.headers.Authorization = `Bearer ${token}`;
    const lang = localStorage.getItem("lng") || "ru";
  config.headers["x-Language"] = lang;
  } else {
    // на всякий случай убираем, если вдруг остался
    delete config.headers.Authorization;
  }
  return config;
});

export default instance;

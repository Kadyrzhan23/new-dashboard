import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // 🔥 ВАЖНО
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lng") || "ru";

  config.params = {
    ...(config.params || {}),
    lang,
  };

  config.headers["x-Language"] = lang;

  return config;
});

export default instance;

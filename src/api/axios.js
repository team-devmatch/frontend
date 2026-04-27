import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // ❌ headers Content-Type 제거!
});

// 요청할 때 JWT 토큰 자동으로 붙여주기
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ FormData면 Content-Type 브라우저한테 맡기기
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default instance;

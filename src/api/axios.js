import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // 환경변수로 교체
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청할 때 JWT 토큰 자동으로 붙여주기
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

import instance from './axios';

// 회원가입 - multipart/form-data 방식으로 수정
export const register = (formData) => {
  return instance.post('/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

// 로그인 - JSON 방식 (기존과 동일)
export const login = (credentials) => {
  return instance.post('/auth/login', credentials);
};

// 내 정보 조회 (기존과 동일)
export const getMe = () => {
  return instance.get('/users/mypage');
};

import instance from './axios';

// 회원가입 - multipart/form-data 방식으로 수정
export const register = (formData) => {
  return instance.post('/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

// 이메일 중복 확인 (백엔드 API 완성되면 주석 해제)
export const checkEmail = async (email) => {
  const res = await instance.get(`/users/check-email?email=${email}`)
  console.log(res.data)
  return res.data
}

// 닉네임 중복 확인
export const checkNickname = async (nickname) => {
  const res = await instance.get(`/users/check-nickname?nickname=${nickname}`)
  console.log(res.data)
  return res.data
}

// 로그인 - JSON 방식 (기존과 동일)
export const login = (credentials) => {
  return instance.post('/auth/login', credentials);
};

// 내 정보 조회
export const getMe = () => {
  return instance.get('/users/mypage');
};

// 프로필 이미지 변경
export const updateProfileImage = (formData) => {
  return instance.put('/users/mypage/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

// 기본 이미지로 변경
export const resetProfileImage = () => {
  return instance.delete('/users/mypage/image');
};

// 회원 탈퇴
export const withdraw = () => {
  return instance.delete('/users/mypage/delete');
};

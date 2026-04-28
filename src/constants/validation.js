// ✅ 유효성 검사 정규식
export const RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  nickname: /^[가-힣a-zA-Z0-9]{2,10}$/,
}

// ✅ 유효성 검사 메시지
export const MESSAGES = {
  email: {
    empty: '이메일을 입력해주세요.',
    format: '올바른 이메일 형식이 아닙니다.',
    duplicate: '이미 사용 중인 이메일입니다.',
    ok: '사용 가능한 이메일입니다.',
  },
  password: {
    empty: '비밀번호를 입력해주세요.',
    format: '8자 이상, 영문·숫자·특수문자(!@#$%^&*)를 포함해야 합니다.',
    notMatch: '비밀번호가 일치하지 않습니다.',
    match: '비밀번호가 일치합니다.',
  },
  nickname: {
    empty: '닉네임을 입력해주세요.',
    format: '2~10자, 한글·영문·숫자만 사용 가능합니다.',
    duplicate: '이미 사용 중인 닉네임입니다.',
    ok: '사용 가능한 닉네임입니다.',
  },
}

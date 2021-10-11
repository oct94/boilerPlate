const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //space 없애주는 역할
    unique: 1, //똑같은 email 사용x
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number, //관리자와 일반 유저를 나눔 (0: 일반유저 1: 관리자)
    default: 0,
  },
  image: String,
  token: {
    type: String, //나중에 유효성 관리
  },
  tokenExp: {
    type: Number, //토큰 사용 기간
  },
});

const User = mongoose.model("User", userSchema);
//모델로 스카를 감쌈.

//다른 파일에서도 쓸 수 있도록
module.exports = { User };

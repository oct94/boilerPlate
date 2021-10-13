const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

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

userSchema.pre("save", function (next) {
  //저장하기 전에 무언가를 해준다.(미들웨어)
  var user = this; //this => userSchema
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; //hash는 보안화한 비밀번호
        //myPlaintextPssowrd => user.password

        next(); //다음 함수 실행(user.save()함수)
      });
    });
  } else {
    next();
  }
  //만약 개인정보를 수정한다면 password일 때만 암호화한다. (만약 id를 바꿨는데 또 암호화 하면 안되니까.)
  //비밀번호를 암호화 시키는 구간.
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword 1234567를 암호화한 후 db에 있는 비밀번호와 같은지 확인함. (복호화가 불가능함으로.)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err), cb(null, isMatch); //같으면
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;
  //jsonwebtoken이용해서 토큰 생성하기.
  var token = json.sign(user._id, "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model("User", userSchema);
//모델로 스키마를 감쌈.

//다른 파일에서도 쓸 수 있도록
module.exports = { User };

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
//바디파서로 클라이언트에서 보내는 정보들을 서버에서 분석해서 가져올 수 있게 해줌.
//application/x-www-form-urlencoded를 분석

app.use(bodyParser.json());
//application/json을 분석

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));
app.get("/api/hello", (req, res) => res.send("안녕하세요."));

app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면 그 정보들을 db에 보내준다.
  //User의 인스턴스를 만듬. => req.body를 인자로 넣음으로써 bodyParser를 통해
  const user = new User(req.body);
  //save전에 암호화 한다.

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  }); //몽고디비의 메서드
});

app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾아본다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //메소드
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
  });

  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
  //user에 정보가 들어있음.
  user.comparePassword(req.body.password, (err, isMatch) => {
    //메소드 => req.body.password가 user의 정보와 같다면,
    if (!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    //비밀번호가 맞다면 유저를 위한 token을 생성함.
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      // 토큰을 저장한다. 쿠키 or 로컬 스토리지 등. => 쿠키parser 다운
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

const port = 5000;
app.listen(port, () => console.log(`example app listening on port ${port}`));

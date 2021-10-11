const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
//바디파서로 클라이언트에서 보내는 정보들을 서버에서 분석해서 가져올 수 있게 해줌.
//application/x-www-form-urlencoded를 분석

app.use(bodyParser.json());
//application/json을 분석

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면 그 정보들을 db에 보내준다.
  //User의 인스턴스를 만듬. => req.body를 인자로 넣음으로써 bodyParser를 통해
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  }); //몽고디비의 메서드
});

app.listen(port, () => console.log(`example app listening on port ${port}`));

//시작점
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./model/User");
const config = require('./config/key');
//application.x-www-form-urlencoded 형식을 받을 수 있게 설정
app.use(bodyParser.urlencoded({extended: true}));

//application/json  받을 수 있게 설정
app.use(bodyParser.json()); 

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!!'))

app.post('/register', (req, res) => {

    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body) //bodyParser로 client에서 보내주는 request를 req.body에 저장한다. 

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({success: true}) //성공하면 json 형식으로 "success: true"라른 메세지 전송
    }) //오는 정보를 몽고db의 user model에 저장됨
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

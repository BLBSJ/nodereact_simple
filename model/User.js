const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //유저가 입력한 값에서 스패이스바가 들어갔을 경우 이를 없에 주는 기능
        unique: 1 //이메일 중복방지
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {  //나중에 유효성 관리를 위해
        type: String
    },
    tokenExp: {  //토큰의 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }

//모델과 스키마 , 모델은 스키마를 감싸주는것=, 스키마는 DB의 데이터 카테고리와 그 각각에 대한 정의....
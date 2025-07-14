const  mongoose  = require('mongoose');

const {Schema } = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatarUrl:{
        type:String,
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    lastLogin:{
        type:Date
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)
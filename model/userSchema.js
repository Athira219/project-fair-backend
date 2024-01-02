//import mongoose
const { error } = require('console')
const mongoose = require('mongoose')
//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'mist be atleast 3 character ,but got {VALUE} ']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new error('Invalid Email')
            }
        }

    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

//create model
//users---> collection name
//userSchema-->model
const users = mongoose.model('users',userSchema)

//export model
module.exports = users
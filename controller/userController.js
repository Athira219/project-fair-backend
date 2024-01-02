//logic to resolve the request
//import model
const users = require('../model/userSchema')
//import jwt
const jwt = require('jsonwebtoken')

//logic for register
exports.register = async (req, res) => {
    //logic
    console.log('register function');
    //extract data from request body - json() in index.js file json data into javascript object
    const { username, email, password } = req.body
    try {
        const existUser = await users.findOne({ email })
        if (existUser) {
            res.status(406).json('Account already exist... Please Login')
        } else {
            //create an object from the model
            const newUser = new users({
                username: username,
                email,
                password,
                github: '',
                linkedin: '',
                profile: ''

            })
            //save function in mongoose - to permanently store this data in mongodb
            await newUser.save()
            //response
            res.status(200).json(newUser)

        }
    }
    catch (err) {
        res.status(401).json('registeration failed ERROR:', err)


    }

}

//-----------login section--------------//

exports.login = async (reqlog, reslog) => {
    //console.log('login function');
    const { email, password } = reqlog.body
    try {
        const existLoginUser = await users.findOne({ email: email, password })
        //console.log(existLoginUser);
        if (existLoginUser) {
            // first is the data send inside the tocken second argument -->based on which tocken is generated
            const tocken = jwt.sign({ userId: existLoginUser._id }, "superkey1234")
            reslog.status(200).json({
                existLoginUser: existLoginUser,
                tocken
            })
        } else {
            reslog.status(406).json('Invalid Email Id & Password')
        }
    }
    catch (error) {
        reslog.status(401).json(`login failed due to ${error}`)

    }
}

//------------------------edit profile----------------------------//

exports.editProfile = async(req, res) => {
    const userId = req.payload
    const { username, email, password, github, linkedin, profile } = req.body
    const ProfileImage = req.file ? req.file.filename : profile

    try{
        const updateProfile = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:ProfileImage},{ new: true })
       await updateProfile.save()
        res.status(200).json(updateProfile)
    }
    catch(err){
        res.status(401).json(err)
    }



}
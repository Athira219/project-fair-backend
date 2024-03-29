// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,'./uploads') // the file will be stored in uploads folder

//     },
//     filename :(req,file,callback)=>{
//        const filename = `image-${Date.now()}-${file.originalname}`
//         callback(null,filename)

//     } 
// })
// //only allow this type of files
// const fileFilter = (req,file,callback)=>{
//     //mimetype is used to set the type of file
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//         callback(null,true)
//     }else{
//         callback(null,false)
//       return  callback(new Error('Only png,jpg,jpeg files are allowed'))
//     }
    

// }

// const multerConfig = multer({
//     storage, //where the file is stored
//     fileFilter //which all file is stored
// })

// module.exports = multerConfig

//  import Multer
const multer = require('multer')


//  to create Storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')

    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

//  to create fileFilter

const fileFilter = (req, file, callback) => {
    // mimetypee is to set the file type
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)

    } else {
        callback(null, false)
        return callback(new Error('Only png ,jpg,jpeg are allowed'))

    }


}

const multerConfig = multer({
    storage, /* where the file is stored*/
    fileFilter /* which all  the file can be stored*/

})

// export the file 
module.exports = multerConfig
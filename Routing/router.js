
//1) import express

const express = require('express')
//import controller
const useController = require('../controller/userController')
const projectController = require('../controller/projectController')

//import jwt middleware
const jwtMiddleware = require('../middileware/jwtMiddleware')

//import multer middleware
const multerConfig = require('../middileware/multerMiddleware')

//2)create an object for router() class in the express module

const router = new express.Router()

//3) path to resolve the request /logic
//synax => router.httpreq('path',()=>{how to solve})
//a)register
router.post('/user/register', useController.register)
//b)Login
router.post('/user/login', useController.login)

//c) add project
router.post('/project/addProject', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)

//d)homeProject
router.get('/project/home-project', projectController.getHomeProjects)
//e)allProject
router.get('/project/all-project', jwtMiddleware, projectController.getAllProject)
//f)userProject
router.get('/user/userproject', jwtMiddleware, projectController.userProject)
//g) edit project
router.put('/project/edit/:id', jwtMiddleware, multerConfig.single('projectImage'), projectController.editProject)
//h) delete project
router.delete('/project/delete/:id', jwtMiddleware,  projectController.deleteproject)
//i) edit profile
router.put('/profile/edit', jwtMiddleware,multerConfig.single('profile'), useController.editProfile)

//4) export router
module.exports = router



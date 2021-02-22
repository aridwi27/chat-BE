const {login, register, getDetailProfile, updatePatchUsers} = require ('../controllers/users')
const express = require ('express')
const upload = require ('../helpers/middleware/multer')
// const {getAllIUsersRedis } = require ('../helpers/redis/users')
const {authToken} = require('../helpers/middleware/auth')
const Router = express.Router()

Router
.post('/login', login)
.post('/register', register)
.get("/profile/:id",authToken, getDetailProfile)
.patch("/update/:id",upload,updatePatchUsers)

module.exports =Router
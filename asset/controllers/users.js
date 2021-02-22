const bycrypt = require('bcrypt')
const {
    register,
    checkEmail,
    modelsGetAllUsersRedis,
    modelsGetDetailProfile,
    modelsUpdatePatchUsers
} = require('../models/users')
const {
    success,
    error
} = require('../helpers/response')
const fs = require('fs')
const {
    JWT
} = require('../helpers/env')
const jwt = require('jsonwebtoken')
const redis = require('../config/redis')
const { result } = require('lodash')

module.exports = {
    login: async (req, res) => {
        const body = req.body
        checkEmail(body.email).then(async (response) => {
            console.log(response)
            if (response.length === 1) {
                const checkPassword = await bycrypt.compare(body.password, response[0].password)
                if (checkPassword === true) {
                    const user = {
                        id: response[0].id,
                        email: response[0].email,
                        room_id: response[0].room_id,
                        image: response[0].image,
                        phone: response[0].phone
                    }
                    const token = jwt.sign(user, JWT)
                    res.json({
                        msg: 'Login Success',
                        id: response[0].id,
                        name: response[0].name,
                        token: token,
                        room_id: response[0].room_id,
                        image: response[0].image,
                        phone: response[0].phone,
                        username: response[0].username
                    })
                    success(res, 200, 'Login Success', {})
                } else {
                    error(res, 400, 'Wrong Password', 'Password Failed', {})
                }
            } else {
                error(res, 400, 'Email Not Registered', 'Email Failed', {})
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    getDetailProfile: (req, res) => {
        try {
          const id = req.params.id;
          modelsGetDetailProfile(id)
            .then((response) => {
              console.log(response)
              const result = {
                id: response[0].id,
                name: response[0].name,
                username: response[0].username,
                phone: response[0].phone,
                image: response[0].image,
                room: response[0].room_id,
                lat: response[0].lat,
                lng: response[0].lng
              }
              // console.log(result)
              success(res, 200, {}, 'get detail success', result)
            })
            .catch((res) => {
              console.log(res)
            })
        } catch (error) {
            console.log(error)
        }
      },
    register: async (req, res) => {
        const body = req.body
        checkEmail(body.email).then(async (response) => {
            if (response.length >= 1) {
                error(res, 400, 'Email Exist')
            } else {
                const salt = await bycrypt.genSalt()
                const password = await bycrypt.hash(body.password, salt)
                const user = {
                    email: body.email,
                    password,
                    username: body.username,
                    name: body.username,
                    room_id: body.room_id
                }
                module.exports.setRedisUsers()
                // res.json(user)
                register(user).then((response) => {
                    success(res, 200, 'Register Success', {}, {})
                }).catch((err) => {
                    error(res, 400, 'Input Problem', err.message, {})
                })
            }
        }).catch((err) => {
            error(res, 500, 'Internal Server Error', err.message, {})
        })
    },
    updatePatchUsers: async(req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            if (req.file || data.name || data.username || data.phone || data.lat || data.lng  ) {
                let dataUpdate = {}

                if (req.file) {
                    dataUpdate = {
                        ...data,
                        image: req.file.filename
                    }
                    modelsGetDetailProfile(id)
                        .then((res) => {
                            fs.unlinkSync(`./public/image/${res[0].image}`)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    dataUpdate = {
                        ...data
                        // password: passwordHash
                    }
                }
                modelsUpdatePatchUsers(dataUpdate, id)
                    .then((response) => {
                        if (response.affectedRows != 0) {
                            module.exports.setRedisUsers()
                            success(res, 200, 'Patch data Success', {}, {})
                        } else {
                            if (req.file) {
                                fs.unlinkSync(`./public/image/${req.file.filename}`)
                            }
                            error(res, 400, 'Nothing Patched, Wrong ID', {}, {})
                        }
                    })
                    .catch((err) => {
                        if (req.file) {
                            fs.unlinkSync(`./public/image/${req.file.filename}`)
                        }
                        error(res, 400, 'Wrong Data Type Given', err.message, {})
                    })
            } else {
                error(res, 400, 'Nothing Patched, No Data Given', 'Empty Data', {})
            }
        } catch (err) {
            if (req.file) {
                fs.unlinkSync(`./public/image/${req.file.filename}`)
            }
            error(res, 500, 'Internal Server Error', err.message, {})
        }
    },
    setRedisUsers: () => {
        modelsGetAllUsersRedis().then((response) => {
            const data = JSON.stringify(response)
            redis.set('users', data)
        }).catch((err) => {
            console.log(err)
        })
    }
}

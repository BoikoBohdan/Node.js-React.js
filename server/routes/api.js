const express = require('express')
const router = express.Router()
const UserController = require('./../controllers/UserController')
const CheckAuth = require('./midleware/check-auth')

router.get('/users', CheckAuth, UserController.getAll)
router.delete('/users/:id', UserController.deleteUser)

router.post('/login', UserController.login)
router.post('/users/signup', UserController.signup)

module.exports = router

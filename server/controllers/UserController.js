const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')
const jwt = require('jsonwebtoken')

const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: 'Auth failed' })
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Auth failed' })
          }
          if (result) {
            const token = jwt.sign(
              { email: user.email, id: user._id, role: user.role },
              'secret',
              { expiresIn: '2h' }
            )
            return res
              .status(200)
              .json({ message: 'Auth successful', token: token })
          }
          return res.status(401).json({ message: 'Auth failed' })
        })
      }
    })
    .catch(error => {
      return res.status(500).json({ error: error })
    })
}
module.exports.login = login

const signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(409).json({ error: 'Mail exists' })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: 'Problem with password!' })
          } else {
            const user = new User({
              email: req.body.email,
              user_name: req.body.user_name,
              password: hash,
              role: 1
            })
            user
              .save()
              .then(result => {
                res
                  .status(200)
                  .json({ message: 'User sign up success!', result: result })
              })
              .catch(error => {
                return res.status(500).json({ error: error })
              })
          }
        })
      }
    })
}
module.exports.signup = signup

const getAll = (req, res) => {
  User.find({})
    .exec()
    .then(result => {
      return res.status(200).json({ result })
    })
    .catch(error => {
      return res.status(500).json({ error: error })
    })
}
module.exports.getAll = getAll

const deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then(result => {
      return res.status(200).json({ message: 'User deleted!' })
    })
    .catch(error => res.status(500).json({ error: error }))
}
module.exports.deleteUser = deleteUser

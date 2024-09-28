import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/user.model.js"
import { errorHandler } from '../utils/error.js'

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body

  // hashing of the password
  const hashedPassword = bcryptjs.hashSync(password, 10)

  // Save user details to the DB
  const newUser = new User({ userName, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json('User created successfully')
  } catch (error) {
    // Error sent to the middleware used in index.js
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'User not found!'))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const isUserExist = await User.findOne({ email: req.body.email })
    if (isUserExist) {
      const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = isUserExist._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        userName:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!')
  } catch (error) {
    next(error)
  }
}
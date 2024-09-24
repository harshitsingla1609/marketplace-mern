import bcryptjs from 'bcryptjs';

import User from "../models/user.model.js"

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
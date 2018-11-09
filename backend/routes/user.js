const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save((error, result) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

router.post('/signin', (req, res) => {
  User.findOne({email: req.body.email}, (error, user) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.headers.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials'}
      });
    }
    const token = jwt.sign({user: user}, 'secret', {expiresIn: "5 days"});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      user: user
    });
  });
});

module.exports = router;

const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

function errorHandling(error){

  const errors = {
    username: '',
    email: '',
    password: ''
  };

  if(error.name === 'ValidationError'){
    Object.keys(error.errors).forEach(function(err){
      errors[err] = error.errors[err].message
    });
  }

  if(error.code === 11000){
    errors.email = "Email already used"
  }

  return errors;
}

const minute = 60;
const maxAge = 15 * minute;
const { SECRET } = process.env;

function generateToken(id){
  return jwt.sign({ id }, SECRET, { expiresIn: maxAge });
}

function customError(username = '', email = '', password = ''){
  this.type = 'custom-error';
  this.username = username;
  this.email = email;
  this.password = password
}

customError.prototype = new Error();

router.route('/register').post(async function(req, res){
  try {
    const { username, email, password, password_confirmation } = req.body;
    if(password !== password_confirmation){
      throw new customError(null, null, 'Password is not matched');
    }
    const user = await User.create({ username, email, password});
    const token = generateToken(user._id);

    res.cookie('authorized_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ id: user._id });
  }catch(e){
    if(e.type === 'custom-error'){
      res.status(400).json(e);
    }else{
      res.status(400).json(errorHandling(e));
    }
  }
});

router.route('/login').post(async function(req, res){
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.cookie('authorized_token', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ id: user._id });
  }catch(e){
    res.status(400).json(e);
  }
});

router.route('/status').get(async function(req, res){
  const token = req.cookies['authorized_token'];
  const status = { status: '' };

  if(token){
    jwt.verify(token, SECRET, function(err){
      if(err){
        status.status = 'logged-out';
      }else{
        status.status = 'logged-in';
      }
    });
  }else{
    status.status = 'logged-out';
  }

  res.status(200).json(status);
});

module.exports = router;
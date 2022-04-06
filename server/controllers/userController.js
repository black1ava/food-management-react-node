const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { SECRET } = process.env;

router.route('/').get(async function(req, res){
  const token = req.cookies['authorized_token'];

  try {
    if(token){
      jwt.verify(token, SECRET, async function(err, decodedToken){
        if(err){
          throw { message: 'Unauthorized access' };
        }

        const { id } = decodedToken;
        const user = await User.findById(id);
        const { username, email } = user;
        res.status(200).json({ username, email });
      });
    }else{
      throw { message: 'Unauthorized access' };
    }
  }catch(e){
    console.log(e);
    res.status(401).json(e);
  }
});

module.exports = router;
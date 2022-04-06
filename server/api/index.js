const authenticationController = require('../controllers/authenticationController');
const userContoller = require('../controllers/userController');

module.exports = function(app){
  app.use('/authentication', authenticationController);
  app.use('/user', userContoller);
}
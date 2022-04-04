const authenticationController = require('../controllers/authenticationController');

module.exports = function(app){
  app.use('/authentication', authenticationController);
}
const usercontroller = require('../controllers').user;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/signup', usercontroller.create);
  app.post('/api/signin',usercontroller.signin);
  app.get('/api/logout',usercontroller.logout);
};

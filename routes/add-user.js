const express = require('express'),
      fs = require('fs'),
      router = express.Router();

const userStore = require('./../user-reader');

router.get('/', (request, response) => {
  response.render('users/add-user');
});

router.post('/', (request, response) => {
  userStore.addUser(request.body);
  response.redirect('/');
});

module.exports = router;

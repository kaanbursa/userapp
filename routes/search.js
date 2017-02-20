const express = require('express'),
      fs = require('fs'),
      router = express.Router(),
      app = express();

const userStore = require('./../user-reader');


router.get('/', (request, response) => {
  response.render('search/search-users');
});

router.post('/', (request, reponse) => {
  reponse.redirect('/search/' + request.body.query);
});


router.get('/:query', (request, response) => {
  var results = userStore.searchUsers(request.params.query);
  console.log('RESULTS ARE:');
  console.log(request.params.query);

  response.render('search/show-results', { results: results });

});

module.exports = router;

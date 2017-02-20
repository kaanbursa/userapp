const express = require('express'),
			pug = require('pug'),
			morgan = require('morgan'),
			bodyParser = require('body-parser'),
			fs = require('fs');

const userRoutes = require('./routes/users'),
			searchRoutes = require('./routes/search'),
			addRoutes = require('./routes/add-user');

const app = express();
		userStore = require('./user-reader');

var likeStore = JSON.parse(fs.readFileSync('likes.json'))

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(express.static('./public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.use('/add-user', addRoutes);

app.get('/', (request, response) => {
	response.render('index', { users: userStore.getUsers() });

});

app.post('/like', (request, response) =>{
	likeStore.likeCount = likeStore.likeCount + 1;

	response.json(likeStore);
	fs.writeFile('likes.json', JSON.stringfy(likeStore), (error, data) => {
		if (error){
			throw error;
		}

		console.log('New like added')

			})
})

app.get('/api/search/*', (req, res) => {
  var results = userStore.searchUsers(req.params[0]);
  res.json(results);
});


app.listen(3000, function() {
 console.log('Web server started on port 3000');
});

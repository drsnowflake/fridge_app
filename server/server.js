const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
	.then((client) => {
		const db = client.db('food_app');
		// const exclusionData = db.collection('exclusions');
		// const exclusionRouter = createRouter(exclusionData);
		// app.use('/api/exclusions', exclusionRouter);
		const favouriteData = db.collection('favourites');
		const favouiteRouter = createRouter(favouriteData);
		app.use('/api/favourites', favouiteRouter);
	})
	.catch(console.err);

app.listen(3000, function () {
	console.log(`Listening on port ${this.address().port}`);
});

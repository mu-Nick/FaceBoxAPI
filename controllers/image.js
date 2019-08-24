const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '53641c20a69a4f93b377e6d9c3a534c8'
});

const handleAPIcall = (req, res) =>{
	app.models
	.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.then(entries => {
		console.log(entries);
		db('users').where('id', '=', id).select('entries')
		.then(entries => {
			res.json(entries[0].entries.toString());
		});
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage,
	handleAPIcall
}
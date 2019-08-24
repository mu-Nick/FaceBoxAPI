const handleGetProfile = (req, res, db) => {
	const { id } = req.params;
	db('users').where('id', id).then(user => {
		res.json(user[0]);
	})
	.catch(err => res.status(400).json('user not found'));
}

module.exports = {
	handleGetProfile
}
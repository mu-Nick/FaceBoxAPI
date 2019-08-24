const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;

	if(!email || !name || !password) {
		return res.status(400).json('incorrect register information');
	}

	passHash = bcrypt.hashSync(password);

	db.transaction(trx => {
		return trx('login').insert({
			email: email, 
			hash: passHash
		})
		.then(response => {
			return trx('users').insert({ 
				email: email, 
				name: name, 
				joined: new Date()
			})
			.then(response => {
				return trx('users').where('email', email).then(data => {
					res.json(data[0]);
				})
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister
}
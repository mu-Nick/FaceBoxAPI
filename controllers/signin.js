const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;

	if(!email || !password) {
		return res.status(400).json('incorrect login credentials');
	}
	
	db('login').where('email', '=', email).then(loginInfo => {
		// console.log(loginInfo[0].hash, password);
		// console.log(bcrypt.compareSync(password, loginInfo[0].hash));
		if(bcrypt.compareSync(password, loginInfo[0].hash)) {
			db('users').where('email', '=', email).then(user => {
				res.json(user[0]);
			})
		} else {
			res.status(400).json('incorrect password');
		}
	})
	.catch(err => res.status(400).json('user not found'));
}

module.exports = {
	handleSignin
}
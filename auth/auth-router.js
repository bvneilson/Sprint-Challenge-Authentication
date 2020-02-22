const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const secrets = require('../secrets.js');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;

  db('users').insert(credentials)
  .then(response => {
    res.status(201).json({message: "User successfully created", response});
  }).catch(err => {
    res.status(500).json({message: "Error registering user"});
  })
});

router.post('/login', (req, res) => {
  const credentials = req.body;
  db('users').where('username', credentials.username)
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({message: `Welcome, ${user.username}!`, token});
    } else {
      res.status(401).json({message: 'Invalid credentials'});
    }
  }).catch(err => {
    res.status(500).json({message: err});
  })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1hr'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

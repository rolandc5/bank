const express = require('express');
const router = express.Router();
const controller = require('./controller');
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const message = 'You are not authorized.. Please loging';
  const token = req.query.token;
  jwt.verify(token, 'fizzbuzz', (err, data) => {
    if (err) return res.status(403).json(message);
    if (!data) return res.status(403).json(message);
    req.decoded = data;
    req.userId = data.id;
    next()
  });
};

router.post('/create', controller.create);
router.post('/login', controller.login);
router.get('/me', isLoggedIn, controller.me);

module.exports = router;

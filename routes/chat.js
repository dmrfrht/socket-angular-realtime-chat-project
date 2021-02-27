const express = require('express');
const router = express.Router();

/* GET chat home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('chat', { user: req.user });
});

module.exports = router;

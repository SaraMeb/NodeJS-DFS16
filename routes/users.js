var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Mango = require('../bin/mongo');

/* login */
router.put('/', function(req, res, next) {
  console.log()
  res.json({
   status : true
  })
});

/* création compte utilisateur */
router.post('/', function(req, res, next) {
  // mdp en clair
  // password_confirm inutile
  // intégrité des données
  let datas = {};
  let errors = [];
  if (!req.body.username || !/([\w\s]{6,}/.test(req.body.username)) {
    errors.push('Nom utilisateur');
  }
  if (!req.body.email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(req.body.email)) {
    errors.push('Email');
  }
  if (!req.body.password || !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(req.body.password)) {
    errors.push('Mot de passe');
  }
  if (!req.body.password_confirm || req.body.password_confirm !== req.body.password) {
    errors.push('Confirmation de mot de passe');
  }

  //mdp en clair
  let password = '';
  let salt = '';
  //sha256(password+salt)
  let datas = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  Mongo.getInstance()
  .collection('users')
  .insertOne(datas,
    function(err, result) {
      console.log(result);
  })
  // res.json({
  //   status : true
  // })
});

// => à partir d'ici l'utilisateur doit être identifié
router.use(function(req, res, next) {
  return next(createError(403))
})

/* returne les données à propos de me. */
router.get('/', function(req, res, next) {
  res.json({
  status : true,
  datas : {
    email: 'a@a.com',
    nom: 'John Doe',
  }
  })
});

/* déconnexion */
router.delete('/', function(req, res, next) {
  //email / password
  // => find BDD
  res.json({
    status : true
  })
});
module.exports = router;

var express = require('express');
var createError = require('http-errors');
var router = express.Router();


/* login */
router.put('/', function(req, res, next) {
  res.json({
   status : true
  })
});

/* création compte utilisateur */
router.post('/', function(req, res, next) {
  res.json({
    status : true
  })
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
    email: '',
    nom: 'machin bidule',
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

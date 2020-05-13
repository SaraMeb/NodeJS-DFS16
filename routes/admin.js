var express = require('express');
const Mongo = require('../bin/mongo');
var createError = require('http-errors');
var router = express.Router();

/* admin avec formulaire login/creation */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    return next() ;
  }
  res.render('admin/index', {title:"flipBook"});
});

router.use(function(req, res, next) {
  // si la session n'exite pas
  if(!req.session || !req.session.user) {
    return next(createError(403));
  }
  return next();
})

/* retourne le dashboard */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {title:"flipBook"});
});

/* creation d'un filpbook */
router.post('/', function(req, res, next) {
  res.json({status : true});
});

/* detail d'un filpbook */
router.get('/:id', function(req, res, next) {
  res.json({status : true, datas:{}});
});

/* edition d'un filpbook */
router.put('/:id', function(req, res, next) {
  res.json({status : true});
});

/* suppression d'un filpbook */
router.delete('/:id', function(req, res, next) {
  res.json({status : true});
});

module.exports = router;

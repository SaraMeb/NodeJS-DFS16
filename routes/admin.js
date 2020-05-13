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
  console.log(req.body.description, req.body.title, req.body.file);
  let errors = [];
  if (!req.body.title) {
    errors.push('Titre');
  }
  if (!req.body.description) {
    errors.push('Description');
  }
  if (!req.body.file) {
    errors.push('PDF !');
  }

  if(errors.length) {
    return res.json({
      status: false,
      message: "Merci de vérifier les champs : "+errors.join(', ')
    })
  }
  let datas = {
    title: req.body.title,
    description: req.body.description,
    file: file
  }

  Mongo.getInstance()
  .collection('flipbooks')
  .insertOne(datas,
    function(err, result) {
      if (err) {
        if(err.message.indexOf('duplicate key') !== -1){
          return  res.json({
            status : false,
            message: err.message
          })
        }
        return  res.json({
          status : false,
          message: 'Ce flipBook existe déjà !'
        })
      }
      return res.json({
        status: true
      })
  })
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

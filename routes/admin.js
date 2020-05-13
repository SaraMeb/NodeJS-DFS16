var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
var multer  = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
    let fileName = uniqid('pdfFile-') + ext ;
    console.log(fileName)
    cb(null, fileName);
  }
});
const upload = multer({storage: storage});


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
  Mongo.getInstance()
  .collection('flipbooks')
  .find()
  .toArray((err, books) => {
    res.render('admin/dashboard', {title:"Administartion des Flipbooks", books:books});
  })

});

/* creation d'un filpbook */

router.post('/', upload.single('file'), function(req, res, next) {
  let errors = [];
  if (!req.body.title) {
    errors.push('Titre');
  }
  if (!req.body.description) {
    errors.push('Description');
  }
  if (!req.file) {
    errors.push('PDF !');
  }

  if(errors.length) {
    return next(createError(412, "Merci de vérifier les champs : "+errors.join(', ')));
  }
  let datas = {
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename,
    publisher: req.session.user.username,
    publishDate: new Date(),
    status:'draft'
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
      }
      res.redirect('/admin');
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
  bookId = req.params.id,
  Mongo.getInstance()
  .collection('flipbooks')
  .deleteOne({file : bookId},
    function(err, result) {
      if (err) {
        if(err.message.indexOf('duplicate key') !== -1){
          return  res.json({
            status : false,
            message: err.message
          })
        }
      }
      res.redirect('/admin');
  })
  res.json({status : true});
});

module.exports = router;

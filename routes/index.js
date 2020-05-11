var express = require('express');
var router = express.Router();

/* Lister les différents flipBooks */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mon Server'});
});

/* retourner en JSON les données liées à un flipBook dont l'id est dans l'url */
router.get('/:id', function(req, res, next) {
  // console.log("id demandé",req.params.id)
  if (req.params.id !== 'azerty') {
    return next();
  }
  res.json({
    title: 'mon flipBook',
    pages:[
      {
        content: 'contenu de la page1'
      }
    ],
    description: "description",
    publisher: "Machin Bidule",
    publishDate: "2020/05/10 à 10:30"
  })
});

module.exports = router;

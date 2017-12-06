var express = require('express');
var router = express.Router();

const formidable = require('formidable');
const gm = require('gm');
const filePath = process.cwd() + '/uploads/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos/:photo_id', (req, res) => {
  res.status(200).sendFile(filePath + req.params.photo_id + '.jpg');
});

router.post('/photos/:photo_id', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(!Object.keys(files).length) {
      res.status(405).send('FILE SIZE IS NULL');
    }
  });

  form.on('fileBegin', (name, file) => {
    file.path = filePath + req.params.photo_id + '.jpg';
  });

  form.on('progress', (bytesReceived, bytesExpected) => {
    console.log(bytesReceived + '/' + bytesExpected);
  });

  res.status(200).send('SUCCESS');
});

module.exports = router;

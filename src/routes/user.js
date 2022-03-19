const express = require('express');
const router = express.Router();
const getUsers = require('../controller/getUsers');
const addUser = require('../controller/addUser');
const editUser = require('../controller/editUser');
const deleteUser = require('../controller/deleteUser');
const getUserById = require('../controller/getUserById');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage });

router.get('/getUsers', (req, res) => {
  getUsers(req, res);
});

router.get('/getUserById/:id', (req, res) => {
  getUserById(req, res);
});

router.post('/addUser', upload.single('user'), (req, res) => {
  addUser(req, res);
});

router.delete('/deleteUser/:id', (req, res) => {
  deleteUser(req, res);
});

router.put('/editUser/:id', upload.single('user'), (req, res) => {
  editUser(req, res);
});

module.exports = router;

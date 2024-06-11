const express = require('express');
const router = express.Router();
const verifyUser = require('../library/verify');
const post_content = require('../controller/postController');

// Tambah Postingan
router.post('/add', post_content.addContent);
// router.post('/add', verifyUser.isLogin, post_content.addContent);

// Ambil data postingan
router.get('/all/:category', post_content.getAllContent);

// Ambil Semua Postingan Saya
router.get('/mypost/:sender_id', post_content.getMyContent);

// Respon Postingan
router.post('/response', post_content.addRespond);

module.exports = router;
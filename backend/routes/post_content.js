const express = require('express');
const router = express.Router();
const verifyUser = require('../library/verify');
const post_content = require('../controller/postController');

// Tambah Postingan
router.post('/add', verifyUser.isLogin, post_content.addContent);

// Update Postingan
router.put('/update_content', verifyUser.isLogin, post_content.updateMyContent);

// Hapus Postingan
router.delete('/delete/:content_id', verifyUser.isLogin, post_content.deleteMyContent);

// Ambil data postingan
router.get('/all_post', verifyUser.isLogin, post_content.getAllContent);

// Ambil Semua Postingan Saya
router.get('/mypost/:sender_id', verifyUser.isLogin, post_content.getMyContent);

// Respon Postingan
router.post('/response', verifyUser.isLogin, post_content.addRespond);

// Kirim Komentar Postingan
router.post('/comments/add', verifyUser.isLogin, post_content.addRespond);

// Ambil Komentar
router.get('/comments/:postId', verifyUser.isLogin, post_content.getRespond)

module.exports = router;
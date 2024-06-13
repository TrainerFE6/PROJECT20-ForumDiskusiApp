const express = require('express');
const router = express.Router();
const verifyUser = require('../library/verify');
const communityController = require('../controller/communityController');

// Create Community
router.post('/add', verifyUser.isLogin, communityController.addCommunity);

// Update Community
router.put('/update/:community_id', verifyUser.isLogin, communityController.updateCommunity);

// Delete Community
router.delete('/delete/:community_id', verifyUser.isLogin, communityController.deleteCommunity);

// Get All Communities
router.get('/all', verifyUser.isLogin, communityController.getAllCommunities);

// Join Community
router.post('/join', verifyUser.isLogin, communityController.joinCommunity);

// Leave Community
router.post('/leave', verifyUser.isLogin, communityController.leaveCommunity);

// Check follow status
router.get('/check_follow/:community_id', verifyUser.isLogin, communityController.checkFollowStatus);

module.exports = router;

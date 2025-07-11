const express = require('express');
const verifyData = require('../middleware/verifyData')
const blogValidation = require('../validations/blog/blogValidation');
const { blogController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');
const { upload } = require('../middleware');

const router = express.Router();

router.post('/',upload.fields([
    {
        name: "img",
        maxCount: 1,
    },
]),verifyToken,blogController.create)

router.post('/upload-image/:blogId',verifyToken,upload.fields([
    {
        name: "img",
        maxCount: 1,
    },
]),blogController.uploadImage)
router.put('/:id',verifyToken,blogController.update)
router.delete('/:id',verifyToken,blogController.deleteOne)
router.get('/:id',blogController.get)
router.get('/',blogController.getAll)
router.post('/:id/comments', verifyToken, blogController.comment);
router.delete('/:blogId/:commentId/comment', verifyToken, blogController.deleteComment);
router.post('/:id/likes', verifyToken, blogController.likes);

module.exports = router
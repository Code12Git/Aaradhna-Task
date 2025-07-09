const express = require('express');
const verifyData = require('../middleware/verifyData')
const blogValidation = require('../validations/blog/blogValidation');
const { blogController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/',verifyData(blogValidation),verifyToken,blogController.create)
router.put('/:id',verifyToken,blogController.update)
router.delete('/:id',verifyToken,blogController.deleteOne)
router.get('/:id',blogController.get)
router.get('/',blogController.getAll)
router.post('/:id/comments', verifyToken, blogController.comment);
router.post('/:id/likes', verifyToken, blogController.likes);

module.exports = router
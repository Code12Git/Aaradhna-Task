const express = require('express');
const verifyData = require('../middleware/verifyData')
const blogValidation = require('../validations/blog/blogValidation');
const { blogController } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');
const { upload } = require('../middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog Posts
 *   description: Blog post management
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Blog Post"
 *               content:
 *                 type: string
 *                 example: "This is the content of my blog post"
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: Optional blog post image
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */
router.post('/', upload.fields([{ name: "img", maxCount: 1 }]), verifyToken, blogController.create)

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Blog Title"
 *               content:
 *                 type: string
 *                 example: "Updated content here"
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: Updated blog post image
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       404:
 *         description: Blog post not found
 */
router.put('/:id', verifyToken, upload.fields([{ name: "img", maxCount: 1 }]), blogController.update)

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       404:
 *         description: Blog post not found
 */
router.delete('/:id', verifyToken, blogController.deleteOne)

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single blog post
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 *       404:
 *         description: Blog post not found
 */
router.get('/:id', blogController.get)

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog Posts]
 *     responses:
 *       200:
 *         description: List of all blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 */
router.get('/', blogController.getAll)

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Great post!"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */
router.post('/:id/comments', verifyToken, blogController.comment);

/**
 * @swagger
 * /api/posts/{blogId}/{commentId}/comment:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       404:
 *         description: Comment not found
 */
router.delete('/:blogId/:commentId/comment', verifyToken, blogController.deleteComment);

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   post:
 *     summary: Like/unlike a blog post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 likesCount:
 *                   type: number
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *       404:
 *         description: Blog post not found
 */
router.post('/:id/likes', verifyToken, blogController.likes);

module.exports = router;
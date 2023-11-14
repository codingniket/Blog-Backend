import express from 'express';
import mongoose from 'mongoose';
import { BlogModel } from '../models/Blogs.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await BlogModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new article
router.post('/', verifyToken, async (req, res) => {
  const blog = new BlogModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userOwner: req.body.userOwner,
  });
  console.log(blog);

  try {
    const result = await blog.save();
    res.status(201).json({
      createdBlog: {
        name: result.name,
        image: result.image,
        description: result.description,
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get('/:blogsId', async (req, res) => {
  try {
    const result = await BlogModel.findById(req.params.blogsId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Article

router.put('/', async (req, res) => {
  const blog = await BlogModel.findById(req.body.blogsId);
  const user = await UserModel.findById(req.body.userId);
  try {
    user.savedArticle.push(blog);
    await user.save();
    res.status(201).json({ savedArticle: user.savedArticle });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/savedArticle/ids/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    res.json({ savedArticle: user?.savedArticle });
  } catch (err) {
    res.json(err);
    res.status(500).json(err);
  }
});

router.get('/savedArticle/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const savedArticle = await BlogModel.find({
      _id: { $in: user.savedArticle },
    });
    console.log(savedArticle);
    res.status(201).json({ savedArticle });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as blogRouter };

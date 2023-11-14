import express from 'express';
import cors from 'cors'; // <- Helps to step communication Front-end and Backend
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { blogRouter } from './routes/blog.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);

app.use('/blog', blogRouter);

mongoose.connect(
  'mongodb+srv://coding:codingniket@food.okrtqgz.mongodb.net/recipes?retryWrites=true&w=majority'
);

// respond with "hello world" when a GET request is made to the homepage

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});

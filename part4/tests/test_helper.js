const Blog = require('../models/blog');

const initialBlogs = [
  { title: 'blog 1', author: 'Cody', url: 'www.test.com', likes: 3 },
  { title: 'blog 2', author: '2', url: 'www.test.com', likes: 23 },
  { title: 'blog 3', author: '3', url: 'www.test.com', likes: 5 },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};

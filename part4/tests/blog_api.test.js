const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('all blogs are returned in JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the unique identifier of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: "Gaston's blog",
    author: 'Gaston',
    url: 'www.test.com',
    likes: 8,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const title = blogsAtEnd.map((r) => r.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(title).toContain("Gaston's blog");
});

test('likes will default to 0 if missing from request', async () => {
  const newBlog = {
    title: "Gaston's blog",
    author: 'Gaston',
    url: 'www.test.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Gaston',
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

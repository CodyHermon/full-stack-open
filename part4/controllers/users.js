const bcruypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;

  if (password.length < 4) {
    return response
      .status(401)
      .json({ error: 'password must be at least 4 characters' });
  }

  if (username.length < 4) {
    return response
      .status(401)
      .json({ error: 'username must be at least 4 characters' });
  }

  const passwordHash = await bcruypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

module.exports = usersRouter;

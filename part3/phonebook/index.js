require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(cors());

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return ' ';
});
app.use(express.json());
app.use(express.static('dist'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  const date = new Date();
  Person.find({}).then((persons) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

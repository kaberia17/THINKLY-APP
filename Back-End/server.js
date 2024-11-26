const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require('openai');

// Models
const Note = require('./models/Note');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const MONGO_URI = 'mongodb+srv://kaberia:qUZsrLahTqUhwfqb@notegenie.neada.mongodb.net/NoteGenie?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// OpenAI setup
const openai = new OpenAIApi(new Configuration({ apiKey: 'YOUR_OPENAI_API_KEY' }));

// Routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Registration failed.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send({ error: 'Invalid password.' });

    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
    res.send({ token, userId: user._id });
  } catch (error) {
    res.status(500).send({ error: 'Login failed.' });
  }
});

// Add a note
app.post('/api/notes', async (req, res) => {
  const { userId, content, category } = req.body;
  try {
    const note = new Note({ userId, content, category });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add note.' });
  }
});

// Fetch notes
app.get('/api/notes/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.send(notes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch notes.' });
  }
});

// Server setup
app.listen(5000, () => console.log('Server running on http://localhost:5000'));

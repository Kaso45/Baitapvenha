const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, `views`)));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Authentication', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connection success');
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const users = mongoose.model('data', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/post', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.send('Passwords do not match');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new users({
    username,
    password: hashedPassword,
  });

  await user.save();
  console.log(user);
  res.send('Registration successful');
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await users.findOne({ username });
  if (!user) {
    return res.send('User not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.send('Login successful');
  } else {
    res.send('Incorrect password');
  }
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});

// Spring 2024 CSE3421 Classroom Application Project
// Matthew Fitzgerald, Donovan Murphy, David Tran, Justas Kuskevicius

// init lines
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// route for default splash page
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password, studentID } = req.body;

    // Check if the submitted credentials match the valid credentials
    if (
      username === "username" &&
      password === "password" &&
      studentID === "123456789"
    ) {
      // If credentials are valid, redirect to the index page
      console.log('Account login authenticated');
      res.redirect('/index');
    } else {
      // If credentials are invalid, redirect back to the login page or display an error message
      console.log('Invalid login credentials');
      res.redirect('/'); // Redirect back to the login page for simplicity
    }
});

// route for rendering the index.ejs page
app.get('/index', (req, res) => {
  res.render('index');
});

// route for take attendance
app.get('/take-attendance', (req, res) => {
  console.log('Account authenticated');
  res.render('take-attendance');
});

// route for classroom chat
app.get('/classroom-chat', (req, res) => {
  console.log('Account authenticated');
  res.render('classroom-chat');
});

// route for wellness survey
app.get('/wellness-survey', (req, res) => {
  console.log('Account authenticated');
  res.render('wellness-survey');
});

// port forward for local hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

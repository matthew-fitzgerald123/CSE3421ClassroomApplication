// Spring 2024 CSE3421 Classroom Application Project
// Matthew Fitzgerald, Donovan Murphy, David Tran, Justas Kuskevicius

// init lines
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// route for default splash page
app.get('/', (req, res) => {
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

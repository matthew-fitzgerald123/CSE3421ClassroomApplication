// Spring 2024 CSE3421 Classroom Application Project
// Matthew Fitzgerald, Donovan Murphy, David Tran, Justas Kuskevicius

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// db init and connect
let db = new sqlite3.Database('./classroom.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Succesfully connected to the database.');
});

// splash page
app.get('/', (req, res) => {
    res.render('index');
});

// take attendance (get students)
app.get('/take-attendance', (req, res) => {
    db.all("SELECT id, name, attendance_status FROM students", [], (err, students) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error fetching students");
            return;
        }
        res.render('take-attendance', { classList: students });
    });
});

// update and post attendance of fetched students
app.post('/update-attendance', (req, res) => {
    const updates = req.body;
    const updatePromises = updates.map(update =>
        new Promise((resolve, reject) => {
            db.run(
                "UPDATE students SET attendance_status = ? WHERE id = ?",
                [update.attendanceStatus, update.studentId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        })
    );

    Promise.all(updatePromises).then(() => {
        res.redirect('/take-attendance');
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error updating attendance");
    });
});

// wellness survey fetch students
app.get('/wellness-survey', (req, res) => {
    db.all("SELECT id, name FROM students", [], (err, students) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error fetching students");
            return;
        }
        res.render('wellness-survey', { students });
    });
});

// wellness survey submit into db
app.post('/submit-survey', (req, res) => {
    const { studentId, dayRating, physicalRating, mentalRating, wellBeingRating, stressRating, comments } = req.body;
    let response = JSON.stringify({ dayRating, physicalRating, mentalRating, wellBeingRating, stressRating, comments });
    db.run("INSERT INTO surveys (student_id, response) VALUES (?, ?)",
        [studentId, response], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send("Error saving survey response");
                return;
            }
            db.run("UPDATE students SET survey_completed = 1 WHERE id = ?", [studentId], function(updateErr) {
                if (updateErr) {
                    console.error(updateErr.message);
                    res.status(500).send("Error updating student survey status");
                    return;
                }
                res.redirect('/');
            });
    });
});

// classroom chat (get sent messages)
app.get('/classroom-chat', (req, res) => {
    db.all("SELECT sender_name, message, timestamp FROM chats ORDER BY timestamp DESC", [], (err, chats) => {
        if (err) {
            console.error(err.message);
            res.send("Error retrieving messages");
            return;
        }
        res.render('classroom-chat', { chats: chats });
    });
});

// classroom chat (insert message into db)
app.post('/send-message', (req, res) => {
    const { senderId, senderName, message } = req.body;
    if (!senderId || !senderName || !message) {
        return res.status(400).send('All fields are required, including the student ID.');
    }
    db.run("INSERT INTO chats (sender_id, sender_name, message) VALUES (?, ?, ?)", [senderId, senderName, message], function(err) {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).send("Database error");
        }
        res.redirect('/classroom-chat');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

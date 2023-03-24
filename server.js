const express = require('express');
const path = require('path');
const savedNotes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    //giving me issues with auto-updating. Will look into it further
    return res.json(savedNotes);
})

app.post('/api/notes', (req, res) => {
    console.log('post');

    const newNoteString = req.body;

    fs.readFile('./db/db.json', function (err, data) {
        let json = JSON.parse(data);

        json.push(newNoteString);

        const newJson = JSON.stringify(json);
        fs.writeFile('./db/db.json', newJson, function (err) {
            if (err) {
                console.log(err);
            }
        }
            );
    })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
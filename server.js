const express = require('express');
const path = require('path');
const htmlRoute = require('./routes/htmlRoutes');
const apiRoute = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(htmlRoute);
app.use(apiRoute);

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Route to delete a note
app.delete('/api/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id;

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Could not read notes data.'});
        };

        const notes = JSON.parse(data);

        const indexNoteDelete = notes.findIndex(note => note.id === indexNoteDelete);

        if (indexNoteDelete === -1) {
            return res.status(404).json({ error: 'Could not find note.'});
        };

        notes.splice(indexNoteDelete, 1);

        fs.writeFile('db.json', JSON.stringify(notes), 'utf8', err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Could not delete note.'});
            };
            
            return res.json({ message: 'Deleted note successfully.'});
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
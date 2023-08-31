const router = require('express').Router();
const { v4: uuidv4} = require('uuid');
const { readAndAppend, ReadFromFile } = require('../public/notes.html');

router.get('/', (req, res) =>
    ReadFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    const { noteTitle, noteText } = req.body;

    if (noteTitle && noteText) {
        const createNote = {
            noteTitle,
            noteText,
            note_id: uuidv4(),
        };

        readAndAppend(createNote, './db/db.json');

        const addingNote = {
            status: 'Success!',
            body: createNote,
        };

        res.json(addingNote);
    } else {
        res.json('Error in posting note');
    }
});

module.exports = router;
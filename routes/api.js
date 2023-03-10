const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// define path for db.json file
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

// route for getting all notes
router.get('/notes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error getting notes' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// route for creating a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({ error: 'Please provide a title and text for the note' });
    return;
  }
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error getting notes' });
      return;
    }
    const notes = JSON.parse(data);
    const newNote = { title, text, id: uuidv4() };
    notes.push(newNote);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving note' });
        return;
      }
      res.json(newNote);
    });
  });
});

// route for deleting a note
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error getting notes' });
      return;
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting note' });
        return;
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;
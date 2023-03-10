const path = require('path');
const router = require('express').Router();

// routes /notes to the notes.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
// routes to the index page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

  module.exports = router;
const express = require('express');
const api = require('./routes/api.js');
const htmls = require('./routes/htmls.js');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', htmls);

// define path for db.json file
const dbFilePath = path.join(__dirname, 'db', 'db.json');

// start server
app.listen(PORT, () => console.log(`Opened at: ${PORT}`));
const express = require('express');
const api = require('./routes/api.js');
const htmls = require('./routes/htmls.js');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', htmls);

// start server
app.listen(PORT, () => console.log(`Opened at: ${PORT}`));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');

// bring in syncAndSeed and call it
const syncAndSeed = require('./database/db');
syncAndSeed();

// dont forget that middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// static dir
app.use(express.static(path.join(__dirname + '/client/')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// routes
app.use('/api/schools', require('./routes/schools'));
app.use('/api/students', require('./routes/students'));

// start listening
app.listen(port, () => console.log(`listening on port: ${port}`));

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const path = require('path');

// bring in syncAndSeed and call it
const { syncAndSeed } = require('./database/database');
syncAndSeed();

// dont forget that middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// start listening
app.listen(port, () => console.log(`listening on port: ${port}`));

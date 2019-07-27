const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database/conn');
const cookieParser = require('cookie-parser');
const Student = require('./database/models/Student');
const Session = require('./database/models/Session');

// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

// const sessionStore = new SequelizeStore({
//   db: db,
//   checkExpirationInterval: 15 * 60 * 1000,
//   expiration: 7 * 24 * 60 * 60 * 1000
// });

// bring in syncAndSeed and call it
const syncAndSeed = require('./database/db');
syncAndSeed();

// dont forget that middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// express-session stuff
app.use(
  session({
    secret: 'acme schools',
    resave: false,
    saveUninitialized: true
  })
);

app.use(async (req, res, next) => {
  if (req.cookies['connect.sid']) {
    const student = await Student.findOne({
      includes: [
        {
          model: Session,
          where: {
            sid: req.cookies['connect.sid']
          }
        }
      ]
    });
    console.log(student);
    const session = await Session.findOne({
      where: {
        sid: req.cookies['connect.sid']
      }
    });

    if (!session) {
      res.clearCookie('sid');
      res.redirect('/');
      return;
    }

    const updatedSession = await session.update({
      count: session.count + 1
    });

    console.log('Session: ', updatedSession.count);

    req.auth = { studentId: student.id };
    next();
  } else {
    next();
  }
});

// static dir
app.use(express.static(path.join(__dirname + '/client/')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// routes
app.use('/api/schools', require('./routes/schools'));
app.use('/api/students', require('./routes/students'));
app.use('/api/sessions', require('./routes/sessions'));

// error-handling
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.send(error.message || 'there was an error');
});

// start listening
app.listen(port, () => console.log(`listening on port: ${port}`));

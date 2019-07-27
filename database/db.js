const db = require('./conn');

// bring in models
const Student = require('./models/Student');
const School = require('./models/School');
const Session = require('./models/Session');

// set up associations
Student.belongsTo(School);
School.hasMany(Student);
Session.belongsTo(Student);

// dummy data
const sampleStudents = [
  {
    firstName: 'Buddy',
    lastName: 'Galletti',
    email: 'buddygalletti@gmail.com',
    gpa: 4.0,
    password: 'password'
  },
  {
    firstName: 'Hannah',
    lastName: 'Galletti',
    email: 'hannahgalletti@gmail.com',
    gpa: 3.9,
    password: 'password'
  },
  {
    firstName: 'Maxwell',
    lastName: 'Richards',
    email: 'maxwellrichards@gmail.com',
    gpa: 2.0,
    password: 'password'
  },
  {
    firstName: 'Josie',
    lastName: 'Low',
    email: 'josielow@gmail.com',
    gpa: 1.0,
    password: 'password'
  },
  {
    firstName: 'Robb',
    lastName: 'Willwand',
    email: 'rwillwand@gmail.com',
    gpa: 3.1,
    password: 'password'
  },
  {
    firstName: 'Josh',
    lastName: 'Salmeron',
    email: 'jsalmeron@gmail.com',
    gpa: 4.0,
    password: 'password'
  },
  {
    firstName: 'Tyler',
    lastName: 'Ulrey',
    email: 'taju@gmail.com',
    gpa: 1.85,
    password: 'password'
  },
  {
    firstName: 'Gail',
    lastName: 'Galletti',
    email: 'gailgalletti@gmail.com',
    gpa: 2.5,
    password: 'password'
  }
];

const sampleSchools = [
  {
    name: '-- Not Enrolled --',
    imageUrl: ''
  },
  {
    name: 'Cal Poly SLO',
    imageUrl: 'https://via.placeholder.com/140x100'
  },
  {
    name: 'Harvard',
    imageUrl: 'https://via.placeholder.com/140x100'
  },
  {
    name: 'Yale',
    imageUrl: 'https://via.placeholder.com/140x100'
  },
  {
    name: 'Brown',
    imageUrl: 'https://via.placeholder.com/140x100'
  },
  {
    name: 'Columbia',
    imageUrl: 'https://via.placeholder.com/140x100'
  }
];

// write a syncAndSeed
const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const [
      notEnrolled,
      calpoly,
      harvard,
      yale,
      brown,
      columbia
    ] = await Promise.all(
      sampleSchools.map(school => {
        return School.create(school);
      })
    );
    const [buddy, hannah, max, josie, robb, josh, ty, gail] = await Promise.all(
      sampleStudents.map(student => {
        return Student.create({ ...student, schoolId: calpoly.id });
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = syncAndSeed;

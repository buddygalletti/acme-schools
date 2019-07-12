const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_schools',
  { logging: false }
);

// bring in models
const Student = require('./models/Student');
const School = require('./models/School');

// set up associations
Student.belongsTo(School);
School.hasMany(Student);

// dummy data
const sampleStudents = [
  {
    firstName: 'Buddy',
    lastName: 'Galletti',
    email: 'buddygalletti@gmail.com',
    GPA: 4.0
  },
  {
    firstName: 'Hannah',
    lastName: 'Galletti',
    email: 'hannahgalletti@gmail.com',
    GPA: 3.9
  },
  {
    firstName: 'Maxwell',
    lastName: 'Richards',
    email: 'maxwellrichards@gmail.com',
    GPA: 2.0
  },
  {
    firstName: 'Josie',
    lastName: 'Low',
    email: 'josielow@gmail.com',
    GPA: 1.0
  },
  {
    firstName: 'Robb',
    lastName: 'Willwand',
    email: 'rwillwand@gmail.com',
    GPA: 3.1
  },
  {
    firstName: 'Josh',
    lastName: 'Salmeron',
    email: 'jsalmeron@gmail.com',
    GPA: 4.0
  },
  {
    firstName: 'Tyler',
    lastName: 'Ulrey',
    email: 'taju@gmail.com',
    GPA: 1.85
  },
  {
    firstName: 'Gail',
    lastName: 'Galletti',
    email: 'gailgalletti@gmail.com',
    GPA: 2.5
  }
];

const sampleSchools = [
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
    await Promise.all(
      sampleStudents.map(student => {
        return Student.create(student);
      })
    );
    await Promise.all(
      sampleSchools.map(school => {
        return School.create(school);
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = {
  db,
  syncAndSeed
};

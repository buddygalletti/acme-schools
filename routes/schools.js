const express = require('express');
const router = express.Router();

// model
const School = require('../database/models/School');
const Student = require('../database/models/Student');

router.get('/', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.send(schools);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const studentsEnrolled = await Student.findAll({
      where: { schoolId: req.params.id }
    });
    res.send(studentsEnrolled);
  } catch (ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [school, wasCreated] = await School.findOrCreate({
      where: {
        name: req.body.name,
        imageUrl: req.body.imageUrl
      }
    });
    school.save();
    res.send(school);
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await School.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

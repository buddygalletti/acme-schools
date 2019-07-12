const express = require('express');
const router = express.Router();

// model
const Student = require('../database/models/Student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Student.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [student, wasCreated] = await Student.findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gpa: req.body.gpa
      }
    });
    school.save();
    res.json(student);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

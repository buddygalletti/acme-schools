const express = require('express');
const router = express.Router();

// model
const Student = require('../database/models/Student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.sendStatus(404);
    } else {
      res.send(student);
    }
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
        gpa: req.body.gpa,
        schoolId: req.body.schoolId
      }
    });
    if (!wasCreated) {
    }
    student.save();
    res.send(student);
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.update({
      schoolId: req.body.schoolId
    });
    res.send(student);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

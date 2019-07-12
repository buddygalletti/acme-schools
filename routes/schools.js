const express = require('express');
const router = express.Router();

// model
const School = require('../database/models/School');

router.get('/', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await School.findByPk(req.params.id));
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
    res.json(school);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

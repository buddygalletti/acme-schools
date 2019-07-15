const express = require('express');
const router = express.Router();

// model
const School = require('../database/models/School');

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
    const school = await School.findByPk(req.params.id);
    if (!school) {
      res.sendStatus(404);
    } else {
      res.send(school);
    }
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

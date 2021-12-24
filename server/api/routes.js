const router = require('express').Router();
const { models: {Movie}} = require('../db');

router.get('/movies', async(req, res, next) => {
  try {
    const movies = await Movie.findAll({
      order: [['name', 'ASC']]
    });
    res.send(movies);
  }
  catch(ex) {
    next(ex);
  }
});

router.get('/movies/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(movie);
  }
  catch(ex) {
    next(ex);
  }
});

router.post('/movies', async(req, res, next) => {
  try {
    res.send(await Movie.create({name: Movie.createRandomMovie()}))
  }
  catch(ex) {
    next(ex);
  }
});

router.delete('/movies/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204)
  }
  catch(ex) {
    next(ex);
  }
});

router.put('/movies/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(await movie.update(req.body))
  }
  catch(ex) {
    next(ex);
  }
});

module.exports = router
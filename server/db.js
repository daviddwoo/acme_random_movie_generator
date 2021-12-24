const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_movies')
const { STRING, INTEGER } = Sequelize;
const faker = require('faker');

const Movie = conn.define('movie', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 5
    }
  }
});

Movie.createRandomMovie = function() {
  return faker.company.catchPhrase();
};

const syncAndSeed = async() => {
  try {
    await conn.sync({force:true});
  }
  catch(ex) {
    console.log(ex);
  }
}

module.exports = {
  models: {
    Movie
  },
  syncAndSeed
}
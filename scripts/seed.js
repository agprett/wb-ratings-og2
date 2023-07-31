import {Movie, Rating, User, db} from '../src/model.js'
import movieData from './data/movies.json' assert { type: 'json' };
import lodash from 'lodash'

console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding database...');

const moviesInDB = await Promise.all(
  movieData.map((movie) => {
    let newMovie = {...movie, releaseDate: new Date(Date.parse(movie.releaseDate))}
    
    Movie.create(newMovie)
    
    return newMovie
  })
)

const usersToCreate = () => {
  let returnedUsers = []

  for(let i = 1; i <= 10; i++) {
    const newUser = {
      email: `user${i}@fakeemail.com`,
      password: 'badpassword'
    }

    returnedUsers.push(newUser)
    
    User.create(newUser)
  }

  return returnedUsers
}

const usersInDB = await Promise.all(usersToCreate())

const ratingsInDB = await Promise.all(
  usersInDB.flatMap((user) => {
    // Get ten random movies
    const randomMovies = lodash.sampleSize(moviesInDB, 10);

    // Create a rating for each movie
    const movieRatings = randomMovies.map((movie) => {
      return Rating.create({
        score: lodash.random(1, 5),
        userId: user.userId,
        movieId: movie.movieId,
      });
    });

    return movieRatings;
  }),
);



// console.log('Finished seeding!')
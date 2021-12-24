import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'

//--------------Action Creators--------------//

const _getMovies = (movies) => {
  return {
    type: 'GET_MOVIES',
    movies
  }
};

const _addMovie = (movie) => {
  return {
    type: 'ADD_MOVIE',
    movie
  }
};

const _deleteMovie = (id) => {
  return {
    type: 'DELETE_MOVIE',
    id
  }
};

const _incrementRating = (movie) => {
  return {
    type: 'INCREMENT_RATING',
    movie
  }
};

const _decrementRating = (movie) => {
  return {
    type: 'DECREMENT_RATING',
    movie
  }
};

export const getMovies = () => {
  return async(dispatch) => {
    const movies = (await axios.get('/api/movies')).data;
    dispatch(_getMovies(movies));
  }
}

//--------------Thunks--------------//

export const addMovie = () => {
  return async(dispatch) => {
    const movie = (await axios.post('/api/movies')).data
    dispatch(_addMovie(movie));
  }
};

export const deleteMovie = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/movies/${id}`);
    dispatch(_deleteMovie(id));
  }
};

export const incrementRating = (movie) => {
  return async(dispatch) => {
    const item = {...movie, rating: movie.rating + 1};
    movie = (await axios.put(`/api/movies/${movie.id}`, item)).data;
    dispatch(_incrementRating(movie));
  }
};

export const decrementRating = (movie) => {
  return async(dispatch) => {
    const item = {...movie, rating: movie.rating - 1};
    movie = (await axios.put(`/api/movies/${movie.id}`, item)).data;
    dispatch(_decrementRating(movie));
  }
};

//--------------CombinedReducer--------------//

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return action.movies.sort((a, b) => b.rating - a.rating)
    case 'ADD_MOVIE':
      return [...state, action.movie]
    case 'DELETE_MOVIE':
      return state.filter((movie) => movie.id !== action.id)
    case 'INCREMENT_RATING':
      return state.map((movie) => movie.id === action.movie.id ? action.movie : movie).sort((a, b) => b.rating - a.rating)
    case 'DECREMENT_RATING':
      return state.map((movie) => movie.id === action.movie.id ? action.movie : movie).sort((a, b) => b.rating - a.rating)
    default:
      return state
  }
};

//--------------Creating store--------------//

const reducer = combineReducers({
  movies: moviesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store


// case 'INCREMENT_RATING':
//   return state.map((movie) => {
//     if (movie.id === action.id) {
//       if (movie.rating === 5) return movie
//       else {
//         movie.rating = movie.rating + 1;
//         return movie
//       } 
//     }
//     else return movie
//   })
// case 'DECREMENT_RATING':
//   return state.map((movie) => {
//     if (movie.id === action.id) {
//       if (movie.rating === 1) return movie
//       else {
//         movie.rating = movie.rating - 1;
//         return movie
//       } 
//     }
//     else return movie
//   })
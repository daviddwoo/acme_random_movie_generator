import React from 'react'
import { connect } from 'react-redux'
import { deleteMovie, incrementRating, decrementRating } from '../store'

const Movies = ({ movies, deleteMovie, incrementRating, decrementRating }) => {
  return (
    <div>
      {
        movies.map((movie) => {
          return (
            <div key={movie.id} className='movieDiv'>
              <button onClick={() => deleteMovie(movie.id)}>DELETE</button>
              {movie.name} ({movie.rating})
              <button onClick={() => decrementRating(movie)}> - </button>
              <button onClick={() => incrementRating(movie)}> + </button>
            </div>
          )
        })
      }
    </div>
  )
};

const mapStateToProps = ({ movies }) => {
  return {
    movies
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovie: (id) => dispatch(deleteMovie(id)),
    incrementRating: (movie) => dispatch(incrementRating(movie)),
    decrementRating: (movie) => dispatch(decrementRating(movie)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
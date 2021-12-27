import React from 'react'
import { connect } from 'react-redux'
import { deleteMovie, incrementRating, decrementRating } from '../store'

// const Movies = ({ movies, deleteMovie, incrementRating, decrementRating }) => {
//   return (
//     <div>
//       {
//         movies.map((movie) => {
//           return (
//             <div key={movie.id} className='movieDiv'>
//               <button onClick={() => deleteMovie(movie.id)}>DELETE</button>
//               {movie.name} ({movie.rating})
//               <button onClick={() => decrementRating(movie)}> - </button>
//               <button onClick={() => incrementRating(movie)}> + </button>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// };

class Movies extends React.Component {
  constructor() {
    super()
    this.state = {
      error: ''
    }
  }

  increment = async(movie) => {
    try {
      await this.props.incrementRating(movie);
      if (this.state.error) {
        this.setState({error: ''})
      }
    }
    catch(ex) {
      console.log(ex);
      this.setState({error: ex.response.data})
    }
  }

  decrement = async(movie) => {
    try {
      await this.props.decrementRating(movie);
      if (this.state.error) {
        this.setState({error: ''})
      }
    }
    catch(ex) {
      console.log(ex);
      this.setState({error: ex.response.data})
    }
  }
  render() {
    return (
      <div>
        {
          this.props.movies.map((movie) => {
            return (
              <div key={movie.id} className='movieDiv'>
                <button onClick={() => this.props.deleteMovie(movie.id)}>DELETE</button>
                {movie.name} ({movie.rating})
                <button onClick={() => this.decrement(movie)}> - </button>
                <button onClick={() => this.increment(movie)}> + </button>
                { !!this.state.error && <div> { 'error cant do that!' }</div>}
              </div>
            )
          })
        }
      </div>
    )
  }
}

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
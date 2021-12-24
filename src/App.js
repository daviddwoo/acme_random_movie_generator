import React from 'react';
import Movies from './Components/Movies';
import { connect } from 'react-redux'
import { getMovies, addMovie } from './store'

class App extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  averageRating = () => {
    return this.props.movies.reduce((acc, curr) => acc + curr.rating, 0) / this.props.movies.length
  }

  render() {
    return (
      <div>
        <div id='appDiv'>
          { `The Average Rating is ${ !this.props.movies.length ? 0 : this.averageRating().toFixed(2)}`}
          <br />
          <button onClick={() => this.props.addMovie()}>Generate Random Movie</button>
        </div>
        <br/>
        { 
          this.props.movies.length ? <Movies /> : <div id='noMovies'>{'There are no movies here!'}</div>
        }
      </div>
    )
  }
};

const mapStateToProps = ({ movies }) => {
  return {
    movies
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(getMovies()),
    addMovie: () => dispatch(addMovie())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
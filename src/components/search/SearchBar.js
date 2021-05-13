import React, {Component} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap'
import axios from 'axios';

const formControlFix = {
  width: 'auto',
  display: 'inline-block'
};

const searchButton = {
  marginBottom: '0.3rem'
};

class SearchBar extends Component {




    constructor(props) {
      super(props);
      this.state = {
        movies: null,
        loading: false,
        value: ''
      };
      this.onChangeHandler = this.onChangeHandler.bind(this);
    }


  search = async val => {
    this.setState({loading: true});
    const res = await axios (
      'https://api.themoviedb.org/3/search/movie?query=${val}&api_key=ce242dc8631f3030059e51dca89df4fb'
    );
    const movies = await res.data.results;
    console.log(movies);
    this.setState({movies: movies, loading: false})
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({value: e.target.value});
  };

  // get renderMovies() {
  //   let movies = "<h1> There's no movies </h1>";
  //   if(this.state.movies) {
  //     movies = <Movies list={this.state.movies} />;
  //   }
  //   return movies;
  // }


  render() {
  return (

      <>
      <Form>
        <FormControl value={this.state.value} onChange={this.onChangeHandler} style={formControlFix} type="text" placeholder="Search" className="mr-sm-2"/> {' '}
        <Button variant="outline-dark" type="submit" style={searchButton}>Search</Button>
      </Form>
      </>
  );
}
}

export default SearchBar;

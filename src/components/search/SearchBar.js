import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const reactSelectStyles = {
  control: base => ({
    width: 500,
    height:100
  })
}

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
    console.log(val);
    const res = await axios (
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=ce242dc8631f3030059e51dca89df4fb`
    );
    const movies = await res.data.results;
    console.log(movies);
  //  this.setState({libraries: movies, loading: false})
  var results = [];
  for(let i = 0; i < movies.length; i++) {
    results.push({label: movies[i].original_title, value: movies[i].original_title});
  }
  console.log(results);
  return results;
  };

  loadOptions = (inputValue, callback) => {
    return this.search(inputValue);
  };


  onChangeHandler = async e => {
    //this.search(e.value);
    this.setState({value: e.value});
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
        <AsyncSelect
          style={{width:'200px'}}
          cacheOptions
          loadOptions={this.loadOptions}
          onInputChange={this.onChangeHandler}/>



      {/*}<Form>
      *}  <FormControl value={this.state.value} onChange={this.onChangeHandler} style={formControlFix} type="text" placeholder="Search" className="mr-sm-2"/> {' '}
        <Button variant="outline-dark" type="submit" style={searchButton}>Search</Button>
      </Form> */}
      </>
  );
}
}

export default SearchBar;

import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import { search } from './util.js';
import Media from './Media';
import './SearchBar.css'

const reactSelectStyles = () => {
  return {
  container: base => ({
    ...base,
    width: '300px',
    display: 'inline-block'
  })
}
}

const formControlFix = {
  width: 'auto',
  display: 'inline-block'
};

const searchButton = {
  marginBottom: '0.3rem'
};

const posterPath = 'https://image.tmdb.org/t/p/original/';


class SearchBar extends Component {




    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }


  search = async val => {
    const res = await search (
      `https://api.themoviedb.org/3/search/multi?query=${val}&api_key=ce242dc8631f3030059e51dca89df4fb`
    );
    const movies = res;
    console.log(movies);
  //  this.setState({libraries: movies, loading: false})
  var results = [];
  for(let i = 0; i < movies.length; i++) {
    results.push({value: movies[i].id, label: <Media data={movies[i]}/>});
  }
  console.log(results);
  return results;
  };

  loadOptions = (inputValue, callback) => {
    return this.search(inputValue);
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
      <div className='react-select-container'>
        <AsyncSelect
          style={formControlFix}
          cacheOptions
          placeholder="Search Media..."
          loadOptions={this.loadOptions}
          components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          />
      </div>



      {/*}<Form>
      *}  <FormControl value={this.state.value} onChange={this.onChangeHandler} style={formControlFix} type="text" placeholder="Search" className="mr-sm-2"/> {' '}
        <Button variant="outline-dark" type="submit" style={searchButton}>Search</Button>
      </Form> */}
      </>
  );
}
}

export default SearchBar;

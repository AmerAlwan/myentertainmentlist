import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';
import { search } from './util.js';
import Media from './Media';
import './SearchBar.css'
import * as config from './config.json';

const searchBarStyle = {
  width: '350px',
  display: 'inline-block',
};

const searchButton = {
  marginBottom: '0.3rem'
};

const posterPath = 'https://image.tmdb.org/t/p/original/';

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


  search = async (val, {page}) => {
  //  this.setState({loading: true});
  //  console.log(val);
    if(!val) return {
      options: [],
      hasMore: false,
      };
    let msConfig = config.default.config.links.tmdb.multisearch;
    const res = await search (
    `${msConfig.link + msConfig.api_key + config.default.config.keys.tmdb + msConfig.query + val + msConfig.page + page}`
  //  `https://api.themoviedb.org/3/search/multi?api_key=ce242dc8631f3030059e51dca89df4fb&query=${val}&page=${page}`
    );
    const movies = res.results;
    //console.log(movies);
  //  this.setState({libraries: movies, loading: false})
  var results = [];
  if (movies) {
    results = movies.map(m => ({value: m.id, label: <Media key={m.id} data={m}/>}));
  }
  //console.log(results);
  return {
    options: results,
    hasMore: res.page < res.total_pages,
    additional: {
      page: page + 1,
    }
  };
  };

  loadOptions = (inputValue, loadedOptions, { page }) => {
    return this.search(inputValue, { page });
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
      <div style={searchBarStyle}>
        <AsyncPaginate
          style={searchBarStyle}
          cacheOptions
          placeholder="Search Media..."
          loadOptions={this.loadOptions}
          onInputChange={this.onChangeHandler}
          components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          controlShouldRenderValue = { false }
          additional={{page:1}}
          />
      </div>
      </>
  );
}
}

export default SearchBar;

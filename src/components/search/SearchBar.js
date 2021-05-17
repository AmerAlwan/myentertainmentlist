import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { AsyncPaginate, wrapMenuList} from 'react-select-async-paginate';
import { components } from 'react-select';
import { search } from './util.js';
import Media from './Media';
import Game from './Game';
import './SearchBar.css'
import * as config from './config.json';

const searchBarStyle = {
  width: '700px',
  display: 'inline-block',
};

const searchButton = {
  marginBottom: '0.3rem'
};

const posterPath = 'https://image.tmdb.org/t/p/original/';

const myMenu = props => {
  console.log(props)
  return (
    <>
      <components.MenuList className="row" {...props}>
        {props.children}
      </components.MenuList>
    </>
  )
}

const myGroup = props => {
  console.log(props)
  return (
    <>
    <Col xs={6}>
      <components.Group {...props}></components.Group>
    </Col>
    </>
  )
}

//
// const myOptions = props => {
//
//   console.log(props)
// //  console.log(innerRef)
//   //console.log(innerProps)
//   return (
//     <>
//     <Row>
//       <Col xs={6}>
//         <AsyncPaginate.GroupHeading>
//           props.options[0].label
//         </AsyncPaginate.GroupHeading>
//       </Col>
//       <Col xs={6}>
//         <AsyncPaginate.GroupHeading>
//           props.options[0].label
//         </AsyncPaginate.GroupHeading>
//       </Col>
//     </Row>
//       </>
//     );
// }

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
    if(!val) { return {
      options: [],
      hasMore: false,
      };
    };
  let msConfig = config.default.config.links.tmdb.multisearch;
  const resMovies = await search (
  `${msConfig.link + msConfig.api_key + config.default.config.keys.tmdb + msConfig.query + val + msConfig.page + page}`
//  `https://api.themoviedb.org/3/search/multi?api_key=ce242dc8631f3030059e51dca89df4fb&query=${val}&page=${page}`
  );
  const movies = resMovies.results;

  let gConfig = config.default.config.links.rawg.list;
  const resGames = await search (
  `${gConfig.link + gConfig.api_key + config.default.config.keys.rawg + gConfig.search + val + gConfig.page + page + gConfig.page_size + 20}`
  );
  const games = resGames.results;
    //console.log(movies);
  //  this.setState({libraries: movies, loading: false})
  var resultsMovies = [];
  var resultsGames = [];
  if (movies) {
    resultsMovies = movies.map(m => ({value: m.id, label: <Media key={m.id} data={m}/>}));
  }

  if (games) {
    resultsGames = games.map(g => ({value: g.id, label: <Game key={g.id} data={g}/>}));
  }

  //console.log(results);

  return {
    options: [
      {
        label: 'Media',
        options: resultsMovies
      },
      {
        label: 'Games',
        options: resultsGames
      }
    ],
    hasMore: ((resMovies.page < resMovies.total_pages) || resGames.next),
    additional: {
      page: page + 1,
    }
  };

  // return {
  //   options: results,
  //   hasMore: ()(resMovies.page < resMovies.total_pages) || resGames.next),
  //   additional: {
  //     page: page + 1,
  //   }
  // };
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
      <Row>
      <div style={searchBarStyle}>
        <AsyncPaginate
          style={searchBarStyle}
          cacheOptions
          placeholder="Search Media..."
          loadOptions={this.loadOptions}
          onInputChange={this.onChangeHandler}
          components={{ Group: myGroup, MenuList: wrapMenuList(myMenu),  DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          controlShouldRenderValue = { false }
          additional={{page:1}}
          />
      </div>
    </Row>
      </>
  );
}
}

export default SearchBar;

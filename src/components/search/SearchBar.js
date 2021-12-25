import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AsyncPaginate, wrapMenuList, reduceGroupedOptions } from 'react-select-async-paginate';
import { components } from 'react-select';
import { search } from './util.js';
import Media from './Media';
import Game from './Game';
import './SearchBar.css'
import * as config from '../../config.json';
import { withRouter } from 'react-router-dom';

const searchBarStyle = {
  display: 'table',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
};

//
// const myOptions = props => {
//
//   //console.log(props)
// //  //console.log(innerRef)
//   ////console.log(innerProps)
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
        value: '',
        redirect: false,
        redirectLink: ''
      };
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.handleItemChosen = this.handleItemChosen.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }


  search = async (val, {page}) => {
  //  this.setState({loading: true});
    var t0 = performance.now()
    if(!val) { return {
      options: [],
      hasMore: false,
      };
    };
    let msConfig = config.default.config.links.tmdb.multisearch;
    let gConfig = config.default.config.links.rawg.list;
    const resMedia = await search (`${msConfig.link + msConfig.api_key + config.default.config.keys.tmdb + msConfig.query + val + msConfig.page + page}`, `${gConfig.link + gConfig.api_key + config.default.config.keys.rawg + gConfig.search + val + gConfig.page + page + gConfig.page_size + 20}`);
//  `https://api.themoviedb.org/3/search/multi?api_key=ce242dc8631f3030059e51dca89df4fb&query=${val}&page=${page}`

      const resMovies = resMedia[0];
      const resGames = resMedia[1];
      const movies = resMovies.data.results;
      const games = resGames.data.results;
        ////console.log(movies);
      //  this.setState({libraries: movies, loading: false})
      var resultsMovies = [];
      var resultsGames = [];
      //console.log(performance.now()-t0)
      if (movies) {
        resultsMovies = movies.map(m => ({value: m.id, label: <Media key={m.id} data={m}/>}));
      }

      if (games) {
        resultsGames = games.map(g => ({value: g.id, label: <Game key={g.id} data={g}/>}));
      }



      ////console.log(results);

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
        hasMore: ((resMovies.data.page < resMovies.data.total_pages) || resGames.data.next),
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

  handleItemChosen = (e, props) => {
    e.stopPropagation();
    e.preventDefault();
    let id = props.data.label.props.data.id;
    let type = props.data.label.props.data.media_type ? props.data.label.props.data.media_type : "game";
    this.props.history.push(`/media/${type}/${id}`);
    //const history = useHistory();
   // history.push(`/media/$type/$id`);
   //this.setState({redirect: true, redirectLink: `/media/${type}/${id}`});
        //  //console.log(id + " " + type);

  }

  handleKeyDown = (e, props) => {
    if(e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      let id = props.data.label.props.data.id;
      let type = props.data.label.props.data.media_type ? props.data.label.props.data.media_type : "game";
      this.props.history.push(`/media/${type}/${id}`);
      //const history = useHistory();
      // history.push(`/media/$type/$id`);
      //this.setState({redirect: true, redirectLink: `/media/${type}/${id}`});
      //  //console.log(id + " " + type);
    }
  }



myMenu = props => {
  ////console.log(props)
  return (
    <>
      <components.MenuList className="row" {...props}>
        {props.children}
      </components.MenuList>
    </>
  )
}

myGroup = props => {
//  //console.log(props)
  return (
    <>
    <Col xs={12} md={6} lg={6}>
      <components.Group {...props}></components.Group>
    </Col>
    </>
  )
}


myOption = props => {
 // //console.log(props)
  return (
    <>
    <div onClick={e => this.handleItemChosen(e, props)} onKeyDown={e => this.handleKeyDown(e, props)}>
      <components.Option {...props}></components.Option>
    </div>
    </>
  )
}


  // get renderMovies() {
  //   let movies = "<h1> There's no movies </h1>";
  //   if(this.state.movies) {
  //     movies = <Movies list={this.state.movies} />;
  //   }
  //   return movies;
  // }


  render() {
//        if(this.state.redirect) {
//            return (<><Redirect to={this.state.redirectLink} /></>)
//          }

      return (
          <>



                    <AsyncPaginate
                      cacheOptions
                      placeholder="Search Media..."
                      loadOptions={this.loadOptions}
                      onInputChange={this.onChangeHandler}
                      components={{ Option: this.myOption, Group: this.myGroup, MenuList: wrapMenuList(this.myMenu),  DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                      controlShouldRenderValue = { false }
                      additional={{page:1}}
                      reduceOptions={reduceGroupedOptions}
                      />


          </>
      );
}
}

export default withRouter(SearchBar);

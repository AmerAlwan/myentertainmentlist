import React, {Component} from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import {AsyncPaginate, wrapMenuList, reduceGroupedOptions, withAsyncPaginate} from 'react-select-async-paginate';
import {components} from 'react-select';
import {search} from './util.js';
import Media from './Media';
import Game from './Game';
import './SearchBar.css'
import * as config from '../../config.json';
import {withRouter} from 'react-router-dom';

const searchBarStyle = {
    display: 'table',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
};

const searchBarStyleFocus = {
    backgroundColor: "red"
}

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
        if (!val) {
            return {
                options: [],
                hasMore: false,
            };
        }
        ;
        let msConfig = config.default.config.links.tmdb.multisearch;
        let gConfig = config.default.config.links.rawg.list;
        const resMedia = await search(`${msConfig.link + msConfig.api_key + config.default.config.keys.tmdb + msConfig.query + val + msConfig.page + page}`, `${gConfig.link + gConfig.api_key + config.default.config.keys.rawg + gConfig.search + val + gConfig.page + page + gConfig.page_size + 20}`);
        const resMovies = resMedia[0];
        const resGames = resMedia[1];
        const movies = resMovies.data.results;
        const games = resGames.data.results;
        var resultsMovies = [];
        var resultsGames = [];
        if (movies) {
            resultsMovies = movies.map(m => ({value: m.id, label: <Media key={m.id} data={m}/>}));
        }

        if (games) {
            resultsGames = games.map(g => ({value: g.id, label: <Game key={g.id} data={g}/>}));
        }
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
    };

    loadOptions = (inputValue, loadedOptions, {page}) => {
        return this.search(inputValue, {page});
    };


    onChangeHandler = async e => {
        //this.search(e.value);
        this.setState({value: e});
    };

    handleItemChosen = (e, props) => {
        e.stopPropagation();
        e.preventDefault();
        let id = props.data.label.props.data.id;
        let type = props.data.label.props.data.media_type ? props.data.label.props.data.media_type : "game";
        this.props.history.push(`/media/${type}/${id}`);
    }

    handleKeyDown = (e, props) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let id = props.data.label.props.data.id;
            let type = props.data.label.props.data.media_type ? props.data.label.props.data.media_type : "game";
            this.props.toggleLoading()
            this.props.history.push(`/media/${type}/${id}`);
        }
    }


    myMenu = props => {
        ////console.log(props)
        return (
            <>
                {!this.state.value ? <></> : (
                    <div>
                        <components.MenuList className="row" {...props}>
                            {props.children}
                        </components.MenuList>
                    </div>
                    )}
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

    mySelect = props => {
        return (
            <>
                <div className="Hello">
                    <AsyncPaginate {...props}></AsyncPaginate>
                </div>
            </>
        )
    }

    render() {
        const CustomAsyncPaginate = withAsyncPaginate(this.mySelect);
        return (
            <>
                <div className={this.state.value ?
                    "mel-searchbar-container-show-overflow" :
                    this.props.animate ?
                        "mel-searchbar-container-animate" :
                        "mel-searchbar-container-default"}
                     style={{zIndex: 1000}}
                >
                    <AsyncPaginate
                        cacheOptions
                        placeholder="Search Media..."
                        loadOptions={this.loadOptions}
                        onInputChange={this.onChangeHandler}
                        components={{
                            Option: this.myOption,
                            Group: this.myGroup,
                            MenuList: wrapMenuList(this.myMenu),
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null
                        }}
                        controlShouldRenderValue={false}
                        additional={{page: 1}}
                        reduceOptions={reduceGroupedOptions}
                        closeMenuOnSelect={false}
                        blurInputOnSelect={false}
                        menuIsOpen={true}
                        autoBlur={false}
                        onSelectResetsInput={false}
                        closeOnSelect={false}
                        removeSelect={false}
                        hideSelectedOptions={false}
                    />
                </div>


            </>
        );
    }
}

export default withRouter(SearchBar);

import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { search } from './util.js';

class Media extends Component {

  constructor(props) {
    super(props);
    this.state = {coverPhoto: ''};
    this.data = this.props.data;
    this.data.overview = this.data.overview ? this.data.overview : '';
    this.data.overview = this.data.overview.substring(0, this.data.overview.indexOf(' ', 100)) + ('...' ? this.data.overview : '');
    this.genres_ids = {28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movies', 53: 'Thriller', 10752: 'War', 37: 'Western'};
    this.genres = this.data.genre_ids ? this.data.genre_ids.map(id => this.genres_ids[id]) : '';
    this.genres = this.genres ? this.genres.join(', ') : '';
    this.date = this.data.release_date ? this.data.release_date : this.data.first_air_date;
    this.year = this.date ? this.date.split('-')[0] : '';
    this.title = this.data.title ? this.data.title : this.data.name;
  //  this.title = this.data.title + (this.year ? ' (' + this.year + ')' : '');
  }

  componentDidMount() {
    this.setState({coverPhoto: this.getCoverPhoto(this.props.data.poster_path)})
  }

   getCoverPhoto = async (val) => {
    const res = await search (
      `https://image.tmdb.org/t/p/original/${val}`
    );
    const image = res;
    return image;
  };

  render() {
    return (
      <>
      <Row>
        <Col xs={3}>
          <img width='50px' height='72px' src={this.state.coverPhoto}/>
        </Col>
        <Col xs={9}>
          <Row>
            <Col>
              <h6> {this.title}</h6>
              <p >{this.genres}</p>
            </Col>
          </Row>
          <Row>
            <Col style={{overflow: 'hidden', height: '36px'}}>
              <p style={{fontSize: '0.5rem'}}> {this.data.overview} </p>
            </Col>
          </Row>
        </Col>
      </Row>





      </>
   );
  }

}

export default Media;

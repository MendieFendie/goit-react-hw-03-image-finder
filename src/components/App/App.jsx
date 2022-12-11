import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Audio } from 'react-loader-spinner';
import css from './App.module.css';
import * as dotenv from 'dotenv';
dotenv.config();

export class App extends React.Component {
  state = {
    pictures: null,
    searchValue: '',
    loading: false,
  };

  searchValue = e => {
    this.setState({ searchValue: e.currentTarget.value.trim() });
  };

  submitSearch = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const searchValue = this.state.searchValue;
    console.log(searchValue);
    fetch(
      `https://pixabay.com/api/?q=${searchValue}&page=1&key=${process.dotenv.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(pictures => this.setState({ pictures: pictures.hits }))
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    const pictures = this.state.pictures;
    const loading = this.state.loading;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.submitSearch} onChange={this.searchValue} />
        {loading && <Audio />}
        {pictures && <ImageGallery pictures={this.state.pictures} />}
        <Button />
      </div>
    );
  }
}

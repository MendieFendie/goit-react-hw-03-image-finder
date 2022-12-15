import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Audio } from 'react-loader-spinner';
import css from './App.module.css';
import Modal from 'components/Modal/Modal';

export class App extends React.Component {
  state = {
    pictures: [],
    searchValue: '',
    loading: false,
    currentPage: 1,
    showModal: false,
    imgUrl: '',
    error: null,
  };

  searchValue = e => {
    this.setState({ searchValue: e.currentTarget.value.trim() });
  };

  submitSearch = e => {
    e.preventDefault();
    const searchValue = this.state.searchValue;
    if (searchValue === '') {
      alert('please enter search value');
    } else {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${searchValue}&page=${this.state.currentPage}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`cant find pictures with ${searchValue} value.`)
          );
        })

        .then(pictures => this.setState({ pictures: pictures.hits }))
        .catch(error => this.setState({ error: error }))
        .finally(() => this.setState({ loading: false }));
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  loadMore = () => {
    this.setState({ loading: true });
    const searchValue = this.state.searchValue;
    this.setState({ currentPage: this.state.currentPage + 1 });

    fetch(
      `https://pixabay.com/api/?q=${searchValue}&page=${this.state.currentPage}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(picture =>
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...picture.hits],
        }))
      )
      .finally(() => this.setState({ loading: false }));
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  openModal = e => {
    const pictures = this.state.pictures;
    const targetImg = e.target.dataset.id;
    if (targetImg) {
      const targetElem = pictures.find(elem => elem.id === Number(targetImg));
      const webUrl = targetElem.webformatURL;
      this.setState({ imgUrl: webUrl });

      this.toggleModal();
    }
  };

  render() {
    const { pictures, loading, showModal, error } = this.state;

    return (
      <div className={css.App}>
        {error && <h1>{error.massage}</h1>}
        <Searchbar onSubmit={this.submitSearch} onChange={this.searchValue} />
        {pictures && (
          <ImageGallery pictures={pictures} openModal={this.openModal} />
        )}
        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
            wrapperClass
          />
        )}
        {pictures.length > 0 && <Button onLoad={this.loadMore} />}
        {showModal && (
          <Modal toggleModal={this.toggleModal} imgUrl={this.state.imgUrl} />
        )}
      </div>
    );
  }
}

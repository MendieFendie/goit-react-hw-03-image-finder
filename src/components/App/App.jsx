import React from 'react';
import axios from 'axios';
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
    currentPage: '',
    showModal: false,
    imgUrl: '',
    error: null,
  };

  formSubmitHandler = data => {
    if (this.state.searchValue !== data.inputValue) {
      this.setState({
        searchValue: data.inputValue,
        currentPage: 1,
        pictures: [],
      });
    }
  };

  loadMore = () => {
    this.setState({ currentPage: Number(this.state.currentPage) + 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const currentPage = this.state.currentPage;
    const searchValue = this.state.searchValue;

    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ loading: true });
      const responce = await axios.get(
        `https://pixabay.com/api/?q=${searchValue}&page=${currentPage}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        pictures: [...this.state.pictures, ...responce.data.hits],
      });
      this.setState({ loading: false });
    }
  }

  closeModal = e => {
    if (e.target.className === 'Modal_Overlay__yoxbg' || e.code === 'Escape') {
      e.preventDefault();
      this.setState({ showModal: !this.state.showModal });
    }
  };

  openModal = e => {
    const pictures = this.state.pictures;
    const targetImg = e.target.dataset.id;
    if (targetImg) {
      const targetElem = pictures.find(elem => elem.id === Number(targetImg));
      const webUrl = targetElem.webformatURL;
      this.setState({ imgUrl: webUrl });

      this.setState({ showModal: !this.state.showModal });
    }
  };

  render() {
    const { pictures, loading, showModal, error } = this.state;

    return (
      <div className={css.App}>
        {error && <h1>{error.massage}</h1>}
        <Searchbar onSubmit={this.formSubmitHandler} />
        {pictures.length !== 0 && (
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
          <Modal closeModal={this.closeModal} imgUrl={this.state.imgUrl} />
        )}
      </div>
    );
  }
}

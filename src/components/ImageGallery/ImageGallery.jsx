import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ pictures, openModal }) => {
  return (
    <ul onClick={openModal} className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          imgSrc={picture.webformatURL}
          largeImgSrc={picture.largeImageURL}
          alt={picture.tags}
          id={picture.id}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

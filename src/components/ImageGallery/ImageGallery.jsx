import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ pictures, toggleModal }) => {
  return (
    <ul onClick={toggleModal} className={css.ImageGallery}>
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

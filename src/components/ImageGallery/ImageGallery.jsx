import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          imgSrc={picture.webformatURL}
          largeImgSrc={picture.largeImageURL}
          alt={picture.tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

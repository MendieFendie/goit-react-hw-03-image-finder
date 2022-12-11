import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imgSrc, alt }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItem_image} src={imgSrc} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;

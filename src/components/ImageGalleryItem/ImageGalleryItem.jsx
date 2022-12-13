import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imgSrc, alt, id }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={imgSrc}
        alt={alt}
        data-id={id}
      />
    </li>
  );
};

export default ImageGalleryItem;

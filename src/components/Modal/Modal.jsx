import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ imgUrl, toggleModal }) => {
  return createPortal(
    <div onClick={toggleModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

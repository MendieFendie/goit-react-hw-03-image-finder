import React from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.props.toggleModal();
    }
  };
  render() {
    return createPortal(
      <div onClick={this.props.toggleModal} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

import React from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    return createPortal(
      <div onClick={this.props.closeModal} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

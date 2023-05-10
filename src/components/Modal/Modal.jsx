import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({largeImageURL, onClose}) { 

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  

   const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

   
    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modal}><img className={css.imageModal} src={largeImageURL} alt={largeImageURL}/></div>
      </div>,
      modalRoot,
    );
  }



Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
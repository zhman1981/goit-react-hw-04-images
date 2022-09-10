import React, { useEffect } from 'react';

export function Modal({ largeImageURL, onModalClose }) {
  useEffect(() => {
    const onKeyDown = evt => {
      if (evt.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onModalClose]);

  return (
    <div
      className="Overlay"
      onClick={evt => {
        if (evt.currentTarget === evt.target) {
          onModalClose();
        }
      }}
    >
      <div className="Modal">
        <img src={largeImageURL} alt="big size" />
      </div>
    </div>
  );
}

export default Modal;

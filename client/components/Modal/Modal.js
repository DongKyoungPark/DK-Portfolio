import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';

import { HiX } from 'react-icons/hi';

import styles from './Modal.module.scss';

const Modal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const [width, setWidth] = useState(0);
  const resize = () => setWidth(window.innerWidth);

  useEffect(() => {
    if (width > 0) {
      disableScroll.off();
      onClose();
    }

    window.addEventListener('resize', resize);
    0 ? setWidth(0) : resize();
    return () => window.removeEventListener('resize', resize);
  }, [width]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseClick = e => {
    e.preventDefault();
    disableScroll.off();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.app__modal} style={{ top: scrollPosition }}>
      <div className={styles.app__modal_container}>
        <div className={styles.app__modal_title}>
          <div className={styles.app__modal_btn} onClick={handleCloseClick}>
            <HiX />
          </div>
        </div>
        <div style={{ paddingTop: '10px' }}>{children}</div>
      </div>
    </div>
  ) : null;

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
  } else {
    return null;
  }
};

export default Modal;

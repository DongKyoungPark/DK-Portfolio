import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../utils/client';

import clsx from 'clsx';
import styles from './Contact.module.scss';

const app__contact = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2 className={styles.head_text}>Contact</h2>

      <div className={styles.app__contact_container}>
        <div className={styles.app__contact_img}>
          <img
            src='https://raw.githubusercontent.com/DongKyoungPark/DongKyoungPark/master/svg/developer.gif'
            alt='contact'
          />
          <p className={styles.p_text} style={{ marginTop: '1rem' }}>
            새로운 것에 도전하는 것은 어려운 일입니다. 어려운 것들을 하기 위해 무언가를 배워야 할
            수도 있고, 모르는 누군가와 함께 일해야 할 수도, 때로는 누군가에게 긍적적인 영향을 줘야
            할 때도 있습니다. 이런 어려움에 늘 도전하는 웹 개발자가 되도록 노력하겠습니다!
          </p>
        </div>

        {!isFormSubmitted ? (
          <div className={clsx(styles.app__contact_form, styles.app__flex)}>
            <div className={styles.app__flex}>
              <input
                className={styles.p_text}
                type='text'
                placeholder='Your Name'
                name='name'
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className='app__flex'>
              <input
                className={styles.p_text}
                type='email'
                placeholder='Your Email'
                name='email'
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className={styles.p_text}
                placeholder='Your Message'
                value={message}
                name='message'
                onChange={handleChangeInput}
              />
            </div>
            <button type='button' className={styles.p_text} onClick={handleSubmit}>
              {!loading ? 'Send Message' : 'Sending...'}
            </button>
          </div>
        ) : (
          <div>
            <h3 className={styles.head_text}>Thank you for getting in touch!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Contact, app__contact), 'contact', 'var(--primary-color)');

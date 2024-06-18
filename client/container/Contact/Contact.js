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

const emailValidation = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});

  const { name, email, message } = formData;

  const validate = (fieldValues = formData) => {
    let temp = { ...validation };

    if ('name' in fieldValues) temp.name = fieldValues.name !== '' ? null : '이름을 입력해주세요.';
    if ('email' in fieldValues)
      temp.email = emailValidation.test(fieldValues.email) ? null : '이메일 형식이 맞지 않습니다.';
    if ('message' in fieldValues)
      temp.message = fieldValues.message !== '' ? null : '메세지를 입력해주세요.';

    setValidation({ ...temp });
    if (fieldValues === formData) return Object.values(temp).every(x => x === '');
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = () => {
    if (name === '') {
      setValidation({ ...validation, name: '이름을 입력해주세요.' });
      return;
    }

    if (email === '') {
      setValidation({ ...validation, email: '이메일을 입력해주세요.' });
      return;
    }

    if (message === '') {
      setValidation({ ...validation, message: '메세지를 입력해주세요.' });
      return;
    }

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

        {isFormSubmitted ? (
          <div className={clsx(styles.app__contact_form, styles.app__flex)}>
            <div className={clsx(styles.app__flex, styles.app__input)}>
              <input
                className={styles.p_text}
                type='text'
                placeholder='Your Name'
                name='name'
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.app__validation}>
              {validation?.name && <p className={styles.p_text}>{validation?.name}</p>}
            </div>

            <div className={clsx(styles.app__flex, styles.app__input)}>
              <input
                className={styles.p_text}
                type='email'
                placeholder='Your Email'
                name='email'
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.app__validation}>
              {validation?.email && <p className={styles.p_text}>{validation?.email}</p>}
            </div>

            <div className={clsx(styles.app__flex, styles.app__input)}>
              <textarea
                className={styles.p_text}
                placeholder='Your Message'
                value={message}
                name='message'
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.app__validation}>
              {validation?.message && <p className={styles.p_text}>{validation?.message}</p>}
            </div>

            <button type='button' className={styles.p_text} onClick={handleSubmit}>
              {!loading ? 'Send Message' : 'Sending...'}
            </button>
          </div>
        ) : (
          <div className={styles.app__flex}>
            <h3 className={styles.head_text} style={{ marginTop: 0 }}>
              Thank you for getting in touch! <br />
              I&apos;ll Keep in touch ASAP!
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Contact, app__contact), 'contact', 'var(--primary-color)');

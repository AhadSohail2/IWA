import React, { Fragment, useState } from 'react'
import LoadingSpinner from '../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../components/Common/UX/StatusOverlay';
import ContactForm from '../components/ContactUs/ContactForm';
import ContactLinks from '../components/ContactUs/ContactLinks';

import { useHttpClient } from '../hooks/http-hook';
import { useRouter } from 'next/router';

import styles from '../styles/contactUs.module.css'
function ContactPage() {

  const router = useRouter();
  const [message, setMessage] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitHandler = async (data) => {
    try {
      await sendRequest('/query', "POST",
        JSON.stringify(data),
        {
          'Content-Type': 'application/json'
        }
      )
      setMessage("We will contact you soon");
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (err) { }
  }

  const clearMessage = async (data) => {
    setMessage();
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
      {message && <StatusOverlay message={message} success={true} onClear={clearMessage} />}
      <div className={`container ${styles.contact_container}`}>
        <div className={styles.contactHeading}>
          <h2>Contact Us</h2>
        </div>
        <div className={styles.contactElements}>
          <ContactForm submit={submitHandler} />
          <ContactLinks />
        </div>
      </div>
    </Fragment>
  )
}

export default ContactPage;
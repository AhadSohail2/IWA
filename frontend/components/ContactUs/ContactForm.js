import React, { useRef } from 'react'

import styles from './ContactForm.module.css';

function ContactForm(props) {

    const nameRef = useRef();
    const emailRef = useRef();
    const queryRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            query: queryRef.current.value
        }
        props.submit(data)
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <input ref={nameRef} type="text" placeholder='Name' required />
            <input ref={emailRef} type="email" placeholder='Email' required />
            <textarea ref={queryRef} placeholder='Query' required></textarea>
            <button>Submit</button>
        </form>
    )
}

export default ContactForm
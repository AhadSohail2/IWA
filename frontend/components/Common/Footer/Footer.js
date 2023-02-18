import React, { Fragment, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useHttpClient } from '../../../hooks/http-hook';
import styles from './Footer.module.css'
import LoadingSpinner from '../UX/LoadingSpinner';
import StatusOverlay from '../UX/StatusOverlay';

function Footer() {
    const emailRef = useRef();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [links, setLinks] = useState([]);
    const [message, setMessage] = useState();
    useEffect(() => {
        const getData = async () => {
            const data = await sendRequest(`/categories`);
            setLinks(data.data)
        }
        getData()
    }, [sendRequest])

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const data = await sendRequest('/newsletter', 'POST', JSON.stringify({ email: emailRef.current.value }), {
                'Content-Type': 'application/json'
            })
            setMessage("Email Registered");
        } catch (err) {

        }
    }

    const clearMessage = () => {
        setMessage(null);
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            {message && <StatusOverlay message={message} success={true} onClear={clearMessage} />}

            <footer className={styles.footer}>
                <div className={`${styles.container} container`}>

                    <div className={styles.footer__aboutUs}>
                        <h3>About Us</h3>
                        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.</p>
                    </div>

                    <div className={styles.footer__categories}>
                        <h3>Categories</h3>
                        {links.map((link) => {
                            return (<Link key={link._id} href={`/products/search/${link.name}`}>{link.name}</Link>)
                        })}
                    </div>

                    <div className={styles.footer__quickLinks}>
                        <h3>Quick Links</h3>
                        <Link href="/aboutus">AboutUs</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>

                    <div className={styles.footer__quickInfo}>

                        <div>
                            <h4>NTN Number</h4>
                            <div>4012118-6</div>
                        </div>

                        <div>
                            <h4>Reg Number</h4>
                            <div>4012118-6</div>
                        </div>

                        <div>
                            <h4>Email</h4>
                            <div>
                                <a href='mailto:support@iwa.com'>support@iwa.com</a>
                            </div>
                        </div>

                        <div>
                            <h4>Whatsapp</h4>
                            <a href='https://api.whatsapp.com/send?phone=000-000-000' target="_blank" rel="noreferrer">000-000-000</a>
                        </div>
                    </div>

                    <div className={styles.footer__newsletter}>
                        <h3>Subscribe to Our Newsletter</h3>
                        <form onSubmit={formSubmitHandler}>
                            <input ref={emailRef} required type="text" placeholder='Enter Email' />
                            <button>Subscribe</button>
                        </form>
                    </div>
                </div>
            </footer>
            <div className={styles.Footer__lowerBar}>
                Copyright 2022  ©  IWA All Right Reserved
            </div>
        </Fragment>

    )
}

export default Footer
import React from 'react';

import styles from './ContactLinks.module.css';

function ContactLinks() {
    return (
        <div className={styles.ContactLinks}>
            <div className={styles.contact_link}>
                <div className={styles.contact_link_heading}>
                    NTN Number
                </div>
                <div className={styles.contact_link_content}>
                    4012118-6
                </div>
            </div>
            <div className={styles.contact_link}>
                <div className={styles.contact_link_heading}>
                    Reg Number
                </div>
                <div className={styles.contact_link_content}>
                    1700401211818
                </div>
            </div>
            <div className={styles.contact_link}>
                <div className={styles.contact_link_heading}>
                    Email
                </div>
                <div className={styles.contact_link_content}>
                    <a href="mailto:someone@example.com">contact@isa.com</a>
                </div>
            </div>
            <div className={styles.contact_link}>
                <div className={styles.contact_link_heading}>
                    Whatsapp
                </div>
                <div className={styles.contact_link_content}>
                    <a href="">000-0000-000</a>
                </div>
            </div>
            <div className={styles.socialIcons}>
                <a href=''><i className="fa-brands fa-facebook"></i></a>
                <a href=''><i className="fa-brands fa-instagram"></i></a>
                <a href=''><i className="fa-brands fa-twitter"></i></a>
                <a href=''><i className="fa-brands fa-whatsapp"></i></a>
            </div>
        </div>
    )
}

export default ContactLinks;
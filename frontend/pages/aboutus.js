import React from 'react'
import Image from 'next/image'

import styles from '../styles/aboutUs.module.css';

function AboutUsPage() {
  return (
    <div className={`container ${styles.container}`}>
      <h1>Who Are We</h1>
      <div className={styles.aboutImage}>
        <div >
          <Image src="/about.png" width={600} height={450} alt="IWA About" />
        </div>
        <div>
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.<br /><br />
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.<br /><br />
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.<br /><br />
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.<br /><br />


          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
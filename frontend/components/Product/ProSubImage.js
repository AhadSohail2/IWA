import React from 'react'
import Image from 'next/image';

import styles from './ProSubImage.module.css'

function ProSubImage(props) {

  const { rId, image, active, alt } = props;

  const clickHandler = () => {
    props.onClick(rId)
  }

  return (
    <div onClick={clickHandler} className={`${styles.subImage} ${active ? styles.active : ''}`} >
      <Image src={image} alt={alt} width={100} height={100} />
    </div>

  )
}

export default ProSubImage
import React, { useState } from 'react';
import Image from 'next/image';

import ProSubImage from './ProSubImage';

import styles from './ProductImages.module.css';

function ProductImages(props) {

  const images = props.images;

  for (let a = 1; a <= images.length; a++) {
    Object.assign(images[a - 1], { rId: a })
  }
  const [activeImage, setActiveImage] = useState(0);

  const setActiveImageHandler = (id) => {
    setActiveImage(id - 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <Image src={images[activeImage].url} height={400} width={450} alt={props.images[activeImage].alt} />
      </div>
      <div className={styles.subImages}>
        {images.map((data) => {
          return <ProSubImage key={data.rId} alt={data.alt} image={data.url} active={activeImage === data.rId - 1} rId={data.rId} onClick={setActiveImageHandler} />
        })}
      </div>
    </div>
  )
}

export default ProductImages;
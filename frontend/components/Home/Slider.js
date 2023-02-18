const DUMMY_Images = [
    {
        id: 1,
        url: "/HomeScreen6.jpg",
        alt: "Jacket Pics",
        link: "/products/sdsd"
    },
    {
        id: 2,
        url: "/HomeScreen4.jpg",
        alt: "Jacket Pics",
        link: "/products/sdsd"
    },
    {
        id: 3,
        url: "/HomeScreen5.jpg",
        alt: "Jacket Pics",
        link: "/products/sdsd"
    }
]

import React from 'react';

import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

import styles from './Slider.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Slider() {

    const clickHandler = (data) => {
        if (data === 0) {

        }
        if (data === 1) {

        }
        if (data === 2) {

        }
    }

    return (
        <div className={styles.container}>
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} onClickItem={clickHandler}>
                {DUMMY_Images.map((data) => {
                    return (
                        <div key={data.id}>
                            <Link href={data.link}>
                                <Image src={data.url} alt={data.alt} width={2000} height={500} /> {//eslint-disable-line
                                }</Link>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Slider
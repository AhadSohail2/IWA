import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './RightControls.module.css'

function RightControls() {
    const router = useRouter()

    function CartHandler() {
        router.push('/user/cart')
    }

    function wishlistHandler() {
        router.push('/user/wishlist')
    }

    return (
        <div className={styles.rightControls}>

            <div className={styles.rightControls__cart}>
                <button onClick={CartHandler}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>
            </div>

            <div className={styles.rightControls__wishlist}>
                <button onClick={wishlistHandler}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            </div>

            <div className={styles.rightControls__account}>
                <Link href="/user">Account</Link>
            </div>
        </div >
    )
}

export default RightControls
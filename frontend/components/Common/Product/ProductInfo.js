import React, { useContext } from 'react'
import Link from 'next/link'
import styles from './ProductInfo.module.css'
import { AuthContext } from '../../../store/auth'

function ProductInfo(props) {
    const authCtx = useContext(AuthContext)
    const wishListHandler = () => {
        props.wishListHandler(props.id)
    }

    return (
        <div className={styles.container}>
            <div className={styles.name}>
                <Link href={`/products/${props.link}`}>
                    <h3>{props.name}</h3>
                </Link>
            </div>
            <div className={styles.priceHeart}>
                <div className={styles.price}>
                    <div className={styles.dPrice}>{`$${props.discountedPrice}`}</div>
                    <div className={styles.oPrice}>{`$${props.price}`}</div>
                </div>
                {authCtx.isLoggedIn &&
                    <div className={styles.heart} onClick={wishListHandler}>
                        {props.isWishListed ? <i className="fa-solid fa-heart"></i> : <i className={`fa-regular fa-heart ${styles.unCheckedHeart}`}></i>}
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductInfo
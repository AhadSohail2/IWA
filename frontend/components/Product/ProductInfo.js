import React, { useRef, useState, useContext, Fragment } from 'react'
import ProColor from './ProColor';

import { AuthContext } from '../../store/auth';

import styles from './ProductInfo.module.css';
import ProSize from './ProSize';
import { useHttpClient } from '../../hooks/http-hook';
import { useRouter } from 'next/router';
import StatusOverlay from '../Common/UX/StatusOverlay';
import LoadingSpinner from '../Common/UX/LoadingSpinner';

function ProductInfo(props) {

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

    const { slang, id, name, colors, size, price, discountPrice, inStock } = props;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [success, setSuccess] = useState(false);
    const [activeColor, setActiceColor] = useState(0);
    const [activeSize, setActiceSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const quantityRef = useRef();

    const buyNowHandler = async () => {
        if (!AuthCtx.isLoggedIn) {
            return router.push("/login");
        }
        const productId = id;
        const selColor = colors[activeColor].color;
        const selSize = size[activeSize].tag;
        const ProductQuan = quantity
        try {
            await sendRequest('/user/cart', 'POST', JSON.stringify({
                proId: productId,
                proColor: selColor,
                proSize: selSize,
                proQuan: ProductQuan,
                action: "PLUS"
            }),
                {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthCtx.token}`
                }
            )
            router.push('/user/cart')
        } catch (err) {

        }

    }

    const addToCartHandler = async () => {
        if (!AuthCtx.isLoggedIn) {
            return router.push("/login");
        }
        const productId = id;
        const selColor = colors[activeColor].color;
        const selSize = size[activeSize].tag;
        const ProductQuan = quantity
        try {
            await sendRequest('/user/cart', 'POST', JSON.stringify({
                proId: productId,
                proColor: selColor,
                proSize: selSize,
                proQuan: ProductQuan,
                action: "PLUS"
            }),
                {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthCtx.token}`
                }
            )
            setSuccess(true);
        } catch (err) {

        }
    }


    const setActiveColorHandler = (id) => {
        setActiceColor(id)
    }
    const clickSizeHandler = (id) => {
        setActiceSize(id)
    }

    const productIncrementHandler = () => {
        setQuantity(prev => { return prev + 1 })
    }
    const productDecrementHandler = () => {
        if (quantity === 1) {
            return 0
        }
        setQuantity(prev => prev - 1)
    }
    const quantityInputHandler = () => {
        setQuantity(Number(quantityRef.current.value))
    }
    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay success={false} onClear={clearError} message={error} />}
            {success && <StatusOverlay success={true} onClear={() => setSuccess(false)} message="Added to Cart" />}
            <div className={styles.container}>
                <h1>{name}</h1>
                <div className={styles.colors}>
                    <div className={styles.subHead}>Colors</div>
                    <div className={styles.colorBoxes}>
                        {colors.map((data, i) => {
                            return (
                                <ProColor
                                    key={data.id}
                                    id={i}
                                    color={data.color}
                                    active={activeColor === i}
                                    onClick={setActiveColorHandler}
                                />)
                        })}
                    </div>
                </div>
                <div className={styles.size}>
                    <div className={styles.subHead}>Size</div>
                    <div className={styles.sizes}>
                        {size.map((data, i) => {
                            return <ProSize
                                key={data.id}
                                id={i}
                                tag={data.tag}
                                active={activeSize === i}
                                onClick={clickSizeHandler}
                            />
                        })}
                    </div>
                </div>
                <div className={styles.price}>
                    <div>{`$${discountPrice}`}</div>
                    <div>{`$${price}`}</div>
                </div>
                <div className={styles.quantity}>
                    <div className={styles.subHead}>
                        Quantity
                    </div>
                    {inStock &&
                        <div className={styles.quantityControls}>
                            <button onClick={productDecrementHandler} ><i className="fa-solid fa-minus"></i></button>
                            <input onChange={quantityInputHandler} ref={quantityRef} type="number" value={quantity} min="1" ></input>
                            <button onClick={productIncrementHandler}><i className="fa-solid fa-plus"></i></button>
                        </div>
                    }
                    {!inStock &&
                        <p className={styles.unavailableStock}>Stock Unavailable</p>
                    }
                </div>
                <div className={styles.socialIcons}>
                    <a href=''><i className="fa-brands fa-facebook"></i></a>
                    <a href=''><i className="fa-brands fa-instagram"></i></a>
                    <a href=''><i className="fa-brands fa-twitter"></i></a>
                    <a href=''><i className="fa-brands fa-whatsapp"></i></a>
                </div>
                {inStock &&
                    <div className={styles.controls}>
                        <button onClick={buyNowHandler}>Buy Now</button>
                        <button onClick={addToCartHandler}>Add To Cart</button>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default ProductInfo
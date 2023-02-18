const Dummy_WishList = [{ id: 2 }];

import React, { Fragment, useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import styles from './ProductCard.module.css'
import ProductInfo from './ProductInfo';
import ProductControls from './ProductControls';
import { AuthContext } from '../../../store/auth';
import { useRouter } from 'next/router';
import { useHttpClient } from '../../../hooks/http-hook';
import StatusOverlay from '../UX/StatusOverlay';
import LoadingSpinner from '../UX/LoadingSpinner';

function ProductCard(props) {

  const router = useRouter();
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { id, image, alt, name, link, discountedPrice, price } = props;
  const [isWished, setIsWished] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (AuthCtx.isLoggedIn) {
      const fetchData = async () => {
        const wishlist = await sendRequest('/user/wishlist', 'GET', null, {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        })
        const IsWishListedItem = wishlist.wishlist.products.filter((data) => { return data._id === id }).length === 1;
        setIsWished(IsWishListedItem);
      }
      fetchData();
    }
  }, [AuthCtx, id, sendRequest, refresh])


  let message;

  const wishListHandler = async () => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login')
    }
    try {
      message = await sendRequest('/user/wishlist', "POST",
        JSON.stringify({ action: "PLUS", product: id }),
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        }
      )
      setRefresh(prev => !prev)
    } catch (err) { }

  }

  const onClickCartHandler = () => {
    if (!AuthCtx.isLoggedIn) {
      return router.push('/login')
    }
    router.push(`/products/${link}`)
  }

  return (
    <Fragment>
      {error && <StatusOverlay success={false} message={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner />}
      <div className={styles.container}>

        <div className={styles.image}>
          <Image src={image} alt={alt} width={260} height={240} />
        </div>

        <ProductInfo
          name={name}
          id={id}
          price={price}
          discountedPrice={discountedPrice}
          isWishListed={isWished}
          link={link}
          wishListHandler={wishListHandler}
        />
        <ProductControls
          id={id}
          onClickCartHandler={onClickCartHandler}
          link={link}
        />
      </div>
    </Fragment>
  )
}

export default ProductCard
const Dummy_WishList = {
  id: "232",
  userID: "waqas@gmail.com",
  products: [
    {
      id: "1",
      image: "/products/1.jpg",
      name: "Leather Shoes Purely",
      price: 2000,
      slang: "pure-leather-dummy-product-1"
    },
    {
      id: "2",
      image: "/products/3.webp",
      name: "Leather Shoes Purely",
      price: 260,
      slang: "pure-leather-dummy-product-1"
    },
    {
      id: "3",
      image: "/products/2.jpg",
      name: "Leather Shoes Purely",
      price: 500,
      slang: "pure-leather-dummy-product-1"
    }
    ,
    {
      id: "4",
      image: "/products/4.png",
      name: "Leather Shoes Purely",
      price: 500,
      slang: "pure-leather-dummy-product-1"
    }
  ]
}

import React, { Fragment, useContext, useState, useEffect } from 'react'

import { useRouter } from 'next/router';

import WishProducts from '../../components/Wishlist/WishProducts';
import LoadingSpinner from '../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../components/Common/UX/StatusOverlay';

import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../store/auth';

import styles from '../../styles/users/wishlist.module.css';


function WishList() {
  const AuthCtx = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login');
    }
  }, [AuthCtx, router])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await sendRequest('/user/wishlist', 'GET', null, {
          'authorization': `Bearer ${AuthCtx.token}`
        })
        setProducts(data.wishLists.products);
      } catch (err) { }
    }
    getData();
  }, [sendRequest, AuthCtx, refresh])

  const removeHandler = async (id) => {
    try {
      await sendRequest('/user/wishlist', "POST",
        JSON.stringify({ action: "MINUS", product: id }),
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        }
      )
      setRefresh(prev => !prev)
    } catch (err) { }
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
      <div className={`container ${styles.container}`}>
        <h2 className={styles.heading}>Wish List</h2>
        {products.length === 0 && <p className={styles.nothingFound}>Add Products to Wishlist That You Want</p>}
        <WishProducts onClick={removeHandler} products={products} />
      </div>
    </Fragment>
  )
}

export default WishList
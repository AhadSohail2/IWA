import React, { Fragment } from 'react'

import styles from '../../styles/products/Product.module.css';

import ProductImages from '../../components/Product/ProductImages'
import ProductInfo from '../../components/Product/ProductInfo';
// import RelatedProducts from '../../components/Product/RelatedProducts';
import ProductDetail from '../../components/Product/ProductDetail';

function ProductSearch(props) {
  const { product } = props;

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.productInfo}>
        <ProductImages images={product.images} />
        <ProductInfo
          key={product._id}
          id={product._id}
          slang={product.slang}
          name={product.name}
          colors={product.colors}
          size={product.sizes}
          price={product.price}
          discountPrice={product.dPrice}
          inStock={product.inStock}
        />
      </div>
      <ProductDetail des={product.description} />
      {/* <RelatedProducts products={Dummy_Products} /> */}
    </div>
  )
}

export default ProductSearch

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.BACKEND}/paths`);
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message);
      throw err;
    } else {
      return {
        paths:
          data.data.map((dat) => {
            return ({
              params: {
                productSlang: dat.slang
              }
            })
          })
        ,
        fallback: "blocking"
      }
    }

  } catch (err) {
    return {
      redirect: {
        destination: "/wentWrong"
      }
    }
  }
}
export async function getStaticProps(context) {

  const slang = context.params.productSlang;

  try {
    const res = await fetch(`${process.env.BACKEND}/product/${slang}`);
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.message);
      throw err;
    } else {
      return {
        props: {
          product: data.data,
        },
        revalidate: 120
      }
    }

  } catch (err) {
    return {
      redirect: {
        destination: "/wentWrong"
      }
    }
  }
}
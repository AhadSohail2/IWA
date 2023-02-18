import React, { useRef, useState } from 'react'

import styles from "./SideNav.module.css";

function SideNav(props) {

  const priceMinRef = useRef();
  const priceMaxRef = useRef();
  const priceRangeRef = useRef();
  const [priceValue, setPriceValue] = useState(200);

  const rangeHandler = () => {
    setPriceValue(priceRangeRef.current.value)
  }
  const minChangeHandler = () => {

  }
  const maxChangeHandler = () => {
    setPriceValue(priceMaxRef.current.value)
  }
  const clearFilterHandler = () => {
    setPriceValue(200)
    applyFilterHandler();
  }
  const applyFilterHandler = () => {
    props.onClick(priceValue);
  }

  return (
    <div className={styles.container}>
      <button onClick={clearFilterHandler}>Clear Filters</button>
      <div className={styles.price}>
        <div className={styles.priceHeading}>Price</div>
        <input ref={priceRangeRef} onChange={rangeHandler} type="range" value={priceValue} step="10" min="0" max="200" className={styles.slider} />
        <div className={styles.priceInputs}>
          <input ref={priceMinRef} type="number" defaultValue="0" onChange={minChangeHandler} min="0" max="200" ></input>
          <input ref={priceMaxRef} type="number" value={priceValue} onChange={maxChangeHandler} min="0" max="200" ></input>
        </div>
      </div>
      <button onClick={applyFilterHandler}>Apply Filters</button>
    </div>
  )
}

export default SideNav
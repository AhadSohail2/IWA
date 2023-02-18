import React from 'react';

import styles from './ProSize.module.css';

function ProSize(props) {

    const clickHandler = () => {
        props.onClick(props.id)
    }
    
    return (
        <div onClick={clickHandler} className={`${props.active ? styles.active : ""} ${styles.container}`
        } > {props.tag}</div >
    )
}

export default ProSize
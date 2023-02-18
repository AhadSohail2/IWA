import React from 'react'

import styles from './ProColor.module.css';

function ProColor(props) {

    const clickHandler = () => {
        props.onClick(props.id)
    }
    return (
        <div onClick={clickHandler} className={props.active ? styles.active : ""} style={{ backgroundColor: props.color, width: "30px", height: '30px' }}>
        </div>
    )
}

export default ProColor
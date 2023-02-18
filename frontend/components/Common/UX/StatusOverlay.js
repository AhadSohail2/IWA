import React, { useEffect } from 'react'

import styles from './StatusOverlay.module.css';

function StatusOverlay(props) {
  useEffect(() => {
    setTimeout(() => props.onClear(), 5000);
  }, [props])
  return (
    <div className={`${styles.errorModal} ${props.success ? styles.success : styles.error}`}>
      {props.message}
    </div>
  )
}

export default StatusOverlay
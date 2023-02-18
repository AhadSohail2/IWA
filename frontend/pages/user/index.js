import React, { useContext, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/users/clientPanel.module.css';
import { AuthContext } from '../../store/auth';

function UserPanel() {
  const router = useRouter()
  const AuthCtx = useContext(AuthContext)


  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login')
    }
  }, [AuthCtx, router])

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.userName}>
        Hello <span>{AuthCtx.userName}</span>
      </div>
      <div className={styles.options}>
        <div className={styles.option}>
          <Link href="/user/updateInfo" className={styles.optionHead}>My Details</Link>
          <p className={styles.optionDetail}>Update your details and Billing Address</p>
        </div>
        <div className={styles.option}>
          <Link href="/user/orders" className={styles.optionHead}>Orders</Link>
          <p className={styles.optionDetail}>View And Cancel Order</p>
        </div>
        <div className={styles.option}>
          <Link href="/user/trackorder" className={styles.optionHead}>Track Order</Link>
          <p className={styles.optionDetail}>Track Your Order By ID</p>
        </div>
      </div>
      <button onClick={AuthCtx.logout} className={styles.logoutButton}>Logout</button>
    </div>

  )
}

export default UserPanel
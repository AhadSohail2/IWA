import React, { useContext } from 'react';
import Link from 'next/link';
import styles from './subNav.module.css'
import { AuthContext } from '../../../store/auth';

function AuthSubNav() {

  const authCtx = useContext(AuthContext);

  return (
    <nav className={styles.subNav} >
      <ul className={`${styles.subNavContainer} container`}>
        <li className={styles.links}><Link href="/admin">Dashboard</Link></li>
        <li className={styles.links}><Link href="/admin/orders">Orders</Link></li>
        <li className={styles.links}><Link href="/admin/users">Users</Link></li>
        <li className={styles.links}><Link href="/admin/products">Products</Link></li>
        <li className={styles.links}><Link href="/admin/categories">Categories</Link></li>
        <li className={styles.links}><Link href="/admin/query">Query</Link></li>
        <li className={styles.links}><Link href="/admin" onClick={authCtx.logout}>Logout</Link></li>
      </ul>
    </nav>
  )
}

export default AuthSubNav
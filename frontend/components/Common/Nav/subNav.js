import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import styles from './subNav.module.css'

function SubNav() {
  const router = useRouter();
  const [dat, setDat] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  useEffect(() => {
    const getData = async () => {
      const data = await sendRequest(`/categories`);
      setDat(data.data)
    }
    getData()
  }, [sendRequest])

  return (
    <nav className={styles.subNav} >
      <ul className={`${styles.subNavContainer} container`}>
        {dat.map((link) => {
          return (<li key={link._id} className={styles.links}><Link href={`/products/search/${link.name}`}>{link.name}</Link></li>)
        })}
        <li className={styles.links}><Link href="/aboutus">About Us</Link></li>
        <li className={styles.links}><Link href="/contact">Contact Us</Link></li>      </ul>
    </nav>
  )
}

export default SubNav
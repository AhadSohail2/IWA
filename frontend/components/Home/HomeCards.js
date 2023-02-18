import Link from 'next/link'
import React from 'react'

import styles from './HomeCards.module.css'
function HomeCards() {
    return (
        <div className={`container ${styles.container}`}>
            <Link href="/products/search/Jackets"><div></div></Link> 
            <Link href="/products/search/Belts"><div></div></Link> 
            <Link href="/products/search/Jackets"><div></div></Link> 
        </div>
    )
}

export default HomeCards
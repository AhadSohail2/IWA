import React, { Fragment } from 'react';
import RightControls from './RightControls';
import SearchBar from './SearchBar';
import SubNav from './subNav';
import UpperBar from './UpperBar';

import styles from './Nav.module.css';
import Link from 'next/link';

function Nav() {
  return (
    <Fragment>
      <UpperBar />
      <div className={styles.navHeader}>
        <div className={`${styles.navContainer} container`}>
          <div className={styles.logoHere}>
            <Link href="/">
              Logo Here
            </Link>
          </div>
          <SearchBar />
          <RightControls />
        </div>
      </div>
      <SubNav />
    </Fragment>
  )
}

export default Nav
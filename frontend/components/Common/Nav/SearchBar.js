import { useRouter } from 'next/router';
import React, { useRef } from 'react'

import styles from './SearchBar.module.css'
function SearchBar() {

    const searchRef = useRef()
    const router = useRouter()

    const submitHandler = (event) => {
        event.preventDefault();
        const param = searchRef.current.value;
        if(param.trim().length===0){
            router.push('/')
        }else{
            router.push(`/products/search/${param}`)
        }
    }
    return (
        <form className={styles.searchbar} onSubmit={submitHandler}>
            <input type="text" ref={searchRef} placeholder='Search Your Product'></input>
            <button>Search</button>
        </form>
    )
}

export default SearchBar
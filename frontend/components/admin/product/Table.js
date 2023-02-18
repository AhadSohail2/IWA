import React, { useEffect, useState } from 'react'
import TableEntry from './TableEntry'

import styles from './Table.module.css';

function Table(props) {

    const data = props.data;
    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Is Featured</th>
                    <th>Price</th>
                    <th>dPrice</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data) => {
                    return (
                        <TableEntry
                            key={data._id}
                            id={data._id}
                            image={data.images[0].url}
                            name={data.name}
                            isFeatured={data.isFeatured}
                            price={data.price}
                            dPrice={data.dPrice}
                            category={data.category.name}
                            slang={data.slang}
                            date={data.createdAt}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
import React, { useEffect, useState } from 'react'
import TableEntry from './TableEntry'

import styles from './Table.module.css';

function Table(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.products)
    }, [props])

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Color</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data) => {
                    return (
                        <TableEntry
                            key={data._id._id}
                            id={data._id._id}
                            payment={data._id.dPrice}
                            image={data._id.images[0].url}
                            quantity={data.quantity}
                            color={data.selectedColor}
                            size={data.selectedSize}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
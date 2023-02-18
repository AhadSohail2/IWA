import React, { useEffect, useState } from 'react'
import TableEntry from './TableEntry'

import styles from './Table.module.css';

function Table(props) {

    const data = props.data;
    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data) => {
                    return (
                        <TableEntry
                            key={data._id}
                            id={data._id}
                            name={data.userID.name}
                            date={data.createdAt}
                            payment={data.totalBill}
                            status={data.status}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table

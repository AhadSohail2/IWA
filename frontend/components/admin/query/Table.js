import React, { useEffect, useState } from 'react'
import TableEntry from './TableEntry'

import styles from './Table.module.css';

function Table(props) {

    const data = props.data;
    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Query</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data) => {
                    return (
                        <TableEntry
                            key={data._id}
                            id={data._id}
                            name={data.name}
                            email={data.email}
                            query={data.query}
                            date={data.createdAt}
                            onDeleteClick={props.onDeleteClick}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
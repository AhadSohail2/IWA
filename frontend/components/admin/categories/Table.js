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
                    <th>Category Name</th>
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
                            name={data.name}
                            onDeleteClick={props.onDeleteClick}
                            onEditClick={props.onEditClick}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
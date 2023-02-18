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
                    <th>Name</th>
                    <th>Postal</th>
                    <th>Phone</th>
                    <th>WhatNo</th>
                    <th>Address</th>
                    <th>DOB</th>
                    <th>Created At</th>
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
                            postal={data.PostalAddress}
                            phone={data.phoneNo}
                            wNo={data.WhatsNo}
                            address={data.address}
                            dob={data.dob}
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
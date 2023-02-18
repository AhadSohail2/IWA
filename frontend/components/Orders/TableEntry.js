
import React, { Fragment } from 'react'

import Link from 'next/link';

function TableEntry(props) {
    const { id, date, payment, status } = props;
    return (
        <Fragment>
            <tr>
                <td>{id}</td>
                <td>{date.split("T")[0]}</td>
                <td>{`$${payment}`}</td>
                <td>{status}</td>
                <td>
                    <Link href={`orders/${id}`}>View</Link>
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
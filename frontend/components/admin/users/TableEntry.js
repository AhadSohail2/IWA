
import React, { Fragment } from 'react'

import Link from 'next/link';

function TableEntry(props) {
    const { id, name, postal, phone, wNo, address, dob, date } = props;

    const clickHandler = (event) => {
        event.preventDefault();
        props.onDeleteClick(id);
    }

    return (
        <Fragment>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{postal}</td>
                <td>{phone}</td>
                <td>{wNo}</td>
                <td>{address}</td>
                <td>{dob.split("T")[0]}</td>
                <td>{date.split("T")[0]}</td>
                <td>
                    <button onClick={clickHandler}>Delete</button>
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
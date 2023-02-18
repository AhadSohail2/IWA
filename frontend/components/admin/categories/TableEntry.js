
import React, { Fragment } from 'react'

import Link from 'next/link';

function TableEntry(props) {
    const { id, name } = props;

    const clickDeleteHandler = async (event) => {
        event.preventDefault();
        props.onDeleteClick(id);
    }

    const clickEditHandler = async (event) => {
        event.preventDefault();
        props.onEditClick({ id: id, name: name });
    }

    return (
        <Fragment>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                    <button onClick={clickEditHandler}>Edit</button>
                </td>
                <td>
                    <button onClick={clickDeleteHandler} style={{ backgroundColor: "red" }}>Delete</button>
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
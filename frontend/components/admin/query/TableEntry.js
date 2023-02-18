
import React, { Fragment } from 'react'


function TableEntry(props) {
    const { id,name, email, query, date } = props;

    const clickHandler = (event) => {
        event.preventDefault();
        props.onDeleteClick(id);
    }

    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{query}</td>
                <td>{date.split("T")[0]}</td>
                <td>
                    <button onClick={clickHandler}>Delete</button>
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
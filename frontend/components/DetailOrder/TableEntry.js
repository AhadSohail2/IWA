
import React, { Fragment } from 'react'

import Link from 'next/link';
import Image from 'next/image';

function TableEntry(props) {
    const { id, payment, image, quantity, color, size } = props;
    return (
        <Fragment>
            <tr>
                <td>
                    <Image src={image} alt="Product Image" width={70} height={70} />
                </td>
                <td>{id}</td>
                <td>{`$${payment}`}</td>
                <td>{quantity}</td>
                <td>
                    <div style={{ "backgroundColor": color }} ></div>
                </td>
                <td>
                    {size}
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
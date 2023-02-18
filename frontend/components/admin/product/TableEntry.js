import React, { Fragment } from 'react'

import { useRouter } from 'next/router';
import Image from 'next/image';

function TableEntry(props) {
    const { id, slang, name, image, isFeatured, price, dPrice, category, date } = props;

    const router = useRouter();

    const clickHandler = (event) => {
        event.preventDefault();
        router.push(`/admin/products/${id}`);
    }

    const ViewclickHandler = (event) => {
        event.preventDefault();
        router.push(`/products/${slang}`)
    }

    return (
        <Fragment>
            <tr>
                <td><Image src={image} width={60} height={60} alt="Product" /></td>
                <td>{name}</td>
                <td>{isFeatured ? "True" : "False"}</td>
                <td>{price}</td>
                <td>{dPrice}</td>
                <td>{category}</td>
                <td>{date.split("T")[0]}</td>
                <td>
                    <button onClick={clickHandler}>Edit</button>
                </td>
                <td>
                    <button onClick={ViewclickHandler}>View</button>
                </td>
            </tr>
        </Fragment>
    )
}

export default TableEntry
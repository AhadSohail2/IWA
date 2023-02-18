import React, { useContext, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

import styles from "../../../styles/admin/products/NewProduct.module.css";

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)
import { EditorState } from 'react-draft-wysiwyg';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewProducts() {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);

    const name = useRef();
    const slang = useRef();
    const color1 = useRef();
    const color2 = useRef();
    const color3 = useRef();
    const color4 = useRef();
    const size1 = useRef();
    const size2 = useRef();
    const size3 = useRef();
    const size4 = useRef();
    const category = useRef();
    const inStock = useRef();
    const isFeatured = useRef();
    const price = useRef();
    const dPrice = useRef();
    const tags = useRef();
    const alt = useRef();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest('/admin/categories', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setCategories(data.categories);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest])

    const imageHandler = (event) => {
        const files = event.target.files;
        setImages(files);
    }

    const onEditorStateChange = (event) => {
        console.log(event.current.value)
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`container ${styles.container} `}>
                <form>
                    <div className={styles.images} >
                        <label for="images" >Images</label>
                        <input onChange={imageHandler} type="file" name='images' id='images' multiple />
                    </div>

                    <input type="text" required placeholder='Name Here' />
                    <input type="text" required placeholder='Slang Here' />
                    <div>
                        <input type="color" required />
                        <input type="color" required />
                        <input type="color" required />
                        <input type="color" required />
                    </div>
                    <div>
                        <input type="text" required placeholder='Size 1' />
                        <input type="text" required placeholder='Size 2' />
                        <input type="text" required placeholder='Size 3' />
                        <input type="text" required placeholder='Size 4' />
                    </div>
                    <div className={styles.selectContainer}>
                        <label for="category">Category</label>
                        <select name="category" id="category">
                            {categories.map((data) => {
                                return <option value={data._id} key={data._id} >{data.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.selectContainer}>
                        <label for="inStock" >In Stock</label>
                        <select name="inStock" id="inStock">
                            <option value="true" >true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div className={styles.selectContainer}>
                        <label for="isFeatured" >Is Featured</label>
                        <select name="isFeatured" id="isFeatured">
                            <option value="true" >true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div>
                        <input type="number" required placeholder='Price' />
                        <input type="number" required placeholder='dPrice' />
                    </div>
                    <div>
                        <input type="text" required placeholder='Tags' />
                        <input type="text" required placeholder='Alt' />
                    </div>
                    <div className={styles.textEditor}>
                        <Editor
                            editorState={EditorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                    <button className={styles.addButton}>Add Product</button>
                </form>
            </div>
        </>
    )
}

export default NewProducts
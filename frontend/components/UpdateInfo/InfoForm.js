import React, { useRef } from 'react';

import styles from './InfoForm.module.css';

function InfoForm(props) {
    const { name, dob, address, PostalAddress, phoneNo, WhatsNo } = props.userData;
    const nameRef = useRef(name);
    const dobRef = useRef(dob);
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const AddressRef = useRef(address);
    const PostalRef = useRef(PostalAddress);
    const PhoneRef = useRef(phoneNo);
    const whatsNoRef = useRef(WhatsNo)

    const submitHandler = (event) => {
        event.preventDefault();
        let newPassword;
        let newRePassword;
        if (passwordRef.current.value.trim().length === 0) {
            newPassword = null;
            newRePassword = null;
        } else {
            newPassword = passwordRef.current.value;
            newRePassword = rePasswordRef.current.value;
        }
        const newData = {
            name: nameRef.current.value,
            dob: dobRef.current.value,
            password: newPassword,
            rePassword: newRePassword,
            address: AddressRef.current.value,
            postalAddress: PostalRef.current.value,
            No: PhoneRef.current.value,
            whatNo: whatsNoRef.current.value
        }
        props.onSubmit(newData)
    }

    return (
        <div className={styles.container}>
            <h2>Update Info</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input type="text" ref={nameRef} defaultValue={name} placeholder="Enter Name" required />
                    <input type="date" ref={dobRef} defaultValue={dob.split("T")[0]} required />
                </div>
                <div>
                    <input ref={passwordRef} type="password" placeholder="Enter New Password" />
                    <input ref={rePasswordRef} type="password" placeholder="ReEnter New Password" />
                </div>
                <p>It you dont want to change keep same as it is</p>
                <div>
                    <input ref={PhoneRef} type="tel" defaultValue={phoneNo} placeholder="Enter Phone Number" required />
                    <input ref={PostalRef} type="text" placeholder="Enter Postal Address" defaultValue={PostalAddress} />
                </div>
                <div>
                    <input ref={whatsNoRef} type="tel" defaultValue={WhatsNo} placeholder="Whatsapp Number(Optional)" />
                </div>
                <textarea ref={AddressRef} cols="70" rows="10" placeholder='Enter Full Address' defaultValue={address}></textarea>
                <button>Update Info</button>
            </form>
        </div>
    )
}

export default InfoForm
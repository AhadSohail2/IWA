import React, { Fragment, useContext } from 'react';

import { useHttpClient } from '../../hooks/http-hook';

import Link from 'next/link';
import styles from './SignUpForm.module.css';
import { AuthContext } from '../../store/auth';
import { useRouter } from 'next/router';
import StatusOverlay from '../Common/UX/StatusOverlay';


function SignUpForm() {
    const AuthCtx = useContext(AuthContext)
    const router = useRouter();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const formHandler = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const rePassword = event.target.rePassword.value;
        const phoneNo = event.target.phoneno.value;
        const whatsappNo = event.target.whatsNo.value;
        const dob = event.target.date.value;
        const add = event.target.fullAddress.value;
        const posAdd = event.target.postalAdd.value;

        try {
            let data = await sendRequest("/auth/signUp", 'POST', JSON.stringify(
                {
                    name,
                    email,
                    password,
                    rePassword,
                    phoneNo,
                    whatsappNo,
                    dob,
                    add,
                    posAdd
                }
            ),
                {
                    'Content-Type': 'application/json'
                }
            )
            data = data.data;
            AuthCtx.login(data.id, data.role, data.name, data.token);
            router.push("/")
        }
        catch (err) {

        }

    }

    return (
        <Fragment>
            {error && <StatusOverlay success={false} message={error} onClear={clearError} />}
            <div className={styles.container}>
                <h2>Sign Up</h2>
                <form onSubmit={formHandler}>
                    <div>
                        <input type="text" id="name" placeholder="Enter Name" required minLength={6} />
                        <input type="date" id="date" required />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Enter Password" />
                        <input type="password" id="rePassword" placeholder="ReEnter Password" />
                    </div>
                    <div>
                        <input type="email" id="email" title='Enter Valid Emaiil jsdj' placeholder="Enter Email" required />
                        <input type="text" id="postalAdd" placeholder="Enter Postal Address" />
                    </div>
                    <div>
                        <input type="tel" id="phoneno" placeholder="Enter Phone Number" />
                        <input type="tel" id="whatsNo" placeholder="Enter Whatsapp Number" />
                    </div>
                    <textarea cols="70" rows="10" id="fullAddress" placeholder='Enter Full Address' ></textarea>
                    <button>Sign Up</button>
                    <Link className={styles.signInLink} href="/login">Sign In</Link>
                </form>
            </div>
        </Fragment>
    )
}

export default SignUpForm
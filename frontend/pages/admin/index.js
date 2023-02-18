import React, { Fragment, useState, useContext, useEffect } from 'react'

import { useRouter } from 'next/router';
import { AuthContext } from '../../store/auth';

function ContactPage() {

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!AuthCtx.isLoggedIn) {
            if (AuthCtx.userRole != "Admin") {
                router.push('/login');
            }
        }else{
            router.push('/admin/orders')
        }
    }, [AuthCtx, router])

    return (
        <Fragment>
           
        </Fragment>
    )
}

export default ContactPage;
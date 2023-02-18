import React, { Fragment, useContext } from 'react'
import Footer from '../Footer/Footer'
import { AuthContext } from '../../../store/auth'
import Nav from '../Nav/Nav'
import AuthSubNav from '../../admin/UX/AuthSubNav';
function Layout(props) {
    const AuthCtx = useContext(AuthContext);
    return (
        <Fragment>
            <Nav />
            {AuthCtx.isLoggedIn && AuthCtx.userRole === "Admin" && <AuthSubNav />}
            <div className='main-container'>
                {props.children}
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout